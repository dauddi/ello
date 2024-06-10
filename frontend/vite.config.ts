/** @type {import('vite').UserConfig} */

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import path from "path";

const aliases = [
  "components",
  "utils",
  "hooks",
  "config",
  "graphql",
  "assets",
  "store",
  "types",
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: aliases.map((alias) => ({
      find: `@${alias}`,
      replacement: path.resolve(__dirname, `src/${alias}`),
    })),
  },
});
