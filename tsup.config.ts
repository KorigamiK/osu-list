import { defineConfig } from "tsup";

console.log("Building...");

export default defineConfig({
  entry: ["index.ts", "src/cli/main.ts"],
  format: ["esm"], // Build for ESmodules and not commonJS for now
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});
