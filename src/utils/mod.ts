import path from "node:path";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";

export function getDataDir(): string | null {
  switch (process.platform) {
    case "linux":
    case "openbsd":
    case "freebsd": {
      const xdg = process.env["XDG_DATA_HOME"];
      if (xdg) return xdg;
      const home = process.env["HOME"];
      if (home) return path.join(home, ".local", "share");
      break;
    }

    case "darwin": {
      const home = process.env["HOME"];
      if (home) return path.join(home, "Library", "Application Support");
      break;
    }

    case "win32":
      return process.env["LOCALAPPDATA"] ?? null;
  }

  return null;
}

export function getConfigDir(): string | null {
  switch (process.platform) {
    case "openbsd":
    case "freebsd":
    case "linux": {
      const xdg = process.env["XDG_CONFIG_HOME"];
      if (xdg) return xdg;
      const home = process.env["HOME"];
      if (home) return path.join(home, ".config");
      break;
    }

    case "darwin": {
      const home = process.env["HOME"];
      if (home) return path.join(home, "Library", "Preferences");
      break;
    }

    case "win32":
      return process.env["APPDATA"] ?? null;
  }

  return null;
}

/**
 * Get Realm for the app, import to the config if it doesn't exist
 */
export function getRealmDBPath(
  appConfigDir: string,
  osuDataDir?: string,
  reload: boolean = false,
) {
  const localDBPath = path.join(appConfigDir, "client.realm");
  if (!reload && existsSync(localDBPath)) return localDBPath;

  const osuDBPath = path.join(
    osuDataDir || getDataDir()! || ".",
    "osu",
    "client.realm",
  );
  if (existsSync(osuDBPath)) {
    console.log(
      `[getRealmDBPath]: ${osuDBPath} is being imported from osu!lazer to ${localDBPath}`,
    );
    mkdirSync(appConfigDir);
    copyFileSync(osuDBPath, localDBPath);
    return localDBPath;
  } else {
    console.log(`[getRealmDBPath]: ${osuDBPath} not found`);
    return null;
  }
}
