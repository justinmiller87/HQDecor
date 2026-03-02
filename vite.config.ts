import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ mode }) => {
    const isSingleFile = mode === 'single'

    return {
        base: './', // Ensures relative paths for standard build
        plugins: isSingleFile ? [viteSingleFile()] : [],
        build: {
            outDir: isSingleFile ? 'dist-single' : 'dist',
        }
    }
})
