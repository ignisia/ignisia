import fs from 'node:fs';
import path from 'node:path';
import { IgnisiaError } from '../../internal/error';
import { Random } from '../../types/common';
import { IgnisiaService } from '../../types/service';
import { hasOwnProperty, isOnCjs } from '../../utils/common';

export function loadFile<T = Random>(id: string): Promise<T> {
  if (isOnCjs()) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(id);
  }

  if (!fs.existsSync(id)) {
    throw new IgnisiaError(`${id} doesn't exist`);
  }

  if (fs.statSync(id).isDirectory()) {
    const infos = fs.readdirSync(id);
    const index = infos.find((info) =>
      info.match(/index\.[jt]s$|index\.[jt]x|index\.[cm][jt]s$/)
    );

    if (!index) {
      throw new IgnisiaError(
        `No index file found in directory ${id} (expected to find index.[jt]s or index.[jt]x or index.[cm][jt]s)`
      );
    }

    return import(path.join(id, index));
  }

  return import(id);
}

export async function loadService(filePath: string) {
  const file:
    | IgnisiaService
    | {
        default: IgnisiaService;
      } = await loadFile(filePath);

  let service: IgnisiaService;

  if (
    // use __esModule as indicator for bun
    hasOwnProperty<IgnisiaService>(file, '__esModule') ||
    // use default as indicator for node
    hasOwnProperty<IgnisiaService>(file, 'default')
  ) {
    service = file.default;

    // In case it exports default twice
    if (hasOwnProperty<IgnisiaService>(service, 'default')) {
      service = service.default;
    }
  } else {
    service = file;
  }

  return service;
}
