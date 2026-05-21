import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

function fallbackIndexHtml(): import("vite").Plugin {
  let clientOutDir: string;
  return {
    name: "fallback-index-html",
    configResolved(config) {
      clientOutDir =
        config.environments?.client?.build?.outDir ??
        join(config.build?.outDir ?? "dist", "client");
    },
    closeBundle() {
      const htmlPath = resolve(clientOutDir, "index.html");
      if (existsSync(htmlPath)) return;

      const assetsDir = join(clientOutDir, "assets");
      const jsFiles: string[] = [];
      const cssFiles: string[] = [];
      if (existsSync(assetsDir)) {
        for (const name of readdirSync(assetsDir)) {
          if (name.endsWith(".js")) jsFiles.push(name);
          else if (name.endsWith(".css")) cssFiles.push(name);
        }
      }

      const cssLinks = cssFiles
        .map((f) => `<link rel="stylesheet" href="/assets/${f}" />`)
        .join("\n");
      const jsScripts = jsFiles
        .map(
          (f) =>
            `<script type="module" async="" src="/assets/${f}"></script>`,
        )
        .join("\n");
      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="description" content="Utkarsh Joshi — Portfolio"/><title>Utkarsh Joshi</title>${cssLinks}</head><body><div id="root"></div>${jsScripts}</body></html>`;
      writeFileSync(htmlPath, html);
      console.log(`[fallback-index-html] Created fallback ${htmlPath}`);
    },
  };
}

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: {
        enabled: true,
        outputPath: "/index.html",
        failOnError: false,
      },
    },
  },
  vite: {
    plugins: [fallbackIndexHtml()],
  },
});
