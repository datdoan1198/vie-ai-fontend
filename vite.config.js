import {defineConfig, transformWithEsbuild} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@ckeditor": path.resolve(__dirname, "node_modules", "@ckeditor"),
        },
    },
    plugins: [
        {
            name: "treat-js-files-as-jsx",
            async transform(code, id) {
                if (!id.match(/src\/.*\.js$/)) return null;

                return transformWithEsbuild(code, id, {
                    loader: "jsx",
                    jsx: "automatic",
                });
            },
        },
        react(),
    ],

    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                ".js": "jsx",
            },
        },
    },
});
