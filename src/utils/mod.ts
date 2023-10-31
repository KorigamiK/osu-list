import { openSync, readSync, writeSync } from "fs";

export const stdin = openSync("/dev/stdin", "rs");

export function dataDir(): string | null {
  switch (process.platform) {
    case "linux":
    case "openbsd":
    case "freebsd": {
      const xdg = process.env["XDG_DATA_HOME"];
      if (xdg) return xdg;

      const home = process.env["HOME"];
      if (home) return `${home}/.local/share`;
      break;
    }

    case "darwin": {
      const home = process.env["HOME"];
      if (home) return `${home}/Library/Application Support`;
      break;
    }

    case "win32":
      return process.env["LOCALAPPDATA"] ?? null;
  }

  return null;
}

export const prompt = (message: string) => {
  writeSync(process.stdout.fd, message + " ");
  let s = "";
  let buf = Buffer.alloc(1);
  readSync(stdin, buf, 0, 1, null);
  while (buf[0] != 10 && buf[0] != 13) {
    s += buf;
    readSync(stdin, buf, 0, 1, null);
  }
  return s;
};
