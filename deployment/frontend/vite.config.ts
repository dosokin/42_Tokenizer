import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {resolve} from "path";

export default defineConfig({
    plugins: [
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                connection: resolve(__dirname, 'connection.html'),
                dashboard: resolve(__dirname, 'dashboard.html'),
                farm: resolve(__dirname, 'farm.html'),
                marketplace: resolve(__dirname, 'marketplace.html'),
            }
        }
    },
    base: "/42_Tokenizer/"
})