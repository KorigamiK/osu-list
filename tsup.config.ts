import { defineConfig } from "tsup";

console.log("Building...");

export default defineConfig({
  entry: ["src/mod.ts", "src/cli/main.ts"],
  format: ["cjs", "esm"], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});
