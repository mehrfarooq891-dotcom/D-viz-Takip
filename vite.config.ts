import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          hakkimizda: path.resolve(__dirname, 'hakkimizda.html'),
          iletisim: path.resolve(__dirname, 'iletisim.html'),
          dolar_kuru_neden_yukseliyor: path.resolve(__dirname, 'dolar-kuru-neden-yukseliyor.html'),
          euro_tl_kuru_takibi: path.resolve(__dirname, 'euro-tl-kuru-takibi.html'),
          turkiye_enflasyonu_2025: path.resolve(__dirname, 'turkiye-enflasyonu-2025.html'),
        },
      },
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
