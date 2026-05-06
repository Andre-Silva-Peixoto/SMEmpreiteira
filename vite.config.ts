import { defineConfig } from "vite";

/** GitHub Pages em subpath (`usuario.github.io/repo/`) exige base com nome do repositório. Defina em CI: `VITE_BASE_PATH=/nome-do-repo/` */
function normalizeBase(raw: string | undefined): string {
  if (!raw || raw === "/") return "/";
  const withSlash = raw.endsWith("/") ? raw : `${raw}/`;
  return withSlash.startsWith("/") ? withSlash : `/${withSlash}`;
}

export default defineConfig({
  root: ".",
  publicDir: "public",
  base: normalizeBase(process.env.VITE_BASE_PATH),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
