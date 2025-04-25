import { defineConfig } from 'tsup';
 
export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    minify: true,
    sourcemap: true,
    treeshake: true,
    external: ['react', 'react-dom'],
    injectStyle: false,
    esbuildOptions(options) {
        options.loader = {
            ...options.loader,
            '.css': 'copy'
        };
    }
});