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
          doviz_cevirici_nasil_kullanilir: path.resolve(__dirname, 'doviz-cevirici-nasil-kullanilir.html'),
          usd_try_paritesi: path.resolve(__dirname, 'usd-try-paritesi.html'),
          altin_fiyatlari_doviz_iliskisi: path.resolve(__dirname, 'altin-fiyatlari-doviz-iliskisi.html'),
          dolar_almak_icin_en_iyi_zaman: path.resolve(__dirname, 'dolar-almak-icin-en-iyi-zaman.html'),
          merkez_bankasi_faiz_kararlari: path.resolve(__dirname, 'merkez-bankasi-faiz-kararlari.html'),
          gbp_try_sterlin_analizi: path.resolve(__dirname, 'gbp-try-sterlin-analizi.html'),
          dolar_mi_euro_mu_tutmali: path.resolve(__dirname, 'dolar-mi-euro-mu-tutmali.html'),
          tl_deger_kaybi_tarihsel: path.resolve(__dirname, 'tl-deger-kaybi-tarihsel.html'),
          doviz_bozdurmak_banka_mi_doviz_burosu_mu: path.resolve(__dirname, 'doviz-bozdurmak-banka-mi-doviz-burosu-mu.html'),
          sar_try_suudi_riyali: path.resolve(__dirname, 'sar-try-suudi-riyali.html'),
          enflasyondan_korunmak_doviz: path.resolve(__dirname, 'enflasyondan-korunmak-doviz.html'),
          chf_try_isvicre_frangi: path.resolve(__dirname, 'chf-try-isvicre-frangi.html'),
          yurt_disina_para_gonderme: path.resolve(__dirname, 'yurt-disina-para-gonderme.html'),
          kripto_para_mi_doviz_mi: path.resolve(__dirname, 'kripto-para-mi-doviz-mi.html'),
          dolar_endeksi_dxy_nedir: path.resolve(__dirname, 'dolar-endeksi-dxy-nedir.html'),
          emekli_doviz_tasarrufu: path.resolve(__dirname, 'emekli-doviz-tasarrufu.html'),
          aed_try_dirhem_kuru: path.resolve(__dirname, 'aed-try-dirhem-kuru.html'),
          doviz_hesabi_acmak: path.resolve(__dirname, 'doviz-hesabi-acmak.html'),
          kira_odemelerinde_doviz: path.resolve(__dirname, 'kira-odemelerinde-doviz.html'),
          doviz_alim_satim_vergileri: path.resolve(__dirname, 'doviz-alim-satim-vergileri.html'),
          rub_try_ruble_kuru: path.resolve(__dirname, 'rub-try-ruble-kuru.html'),
          doviz_alirken_dikkat_edilmesi_gerekenler: path.resolve(__dirname, 'doviz-alirken-dikkat-edilmesi-gerekenler.html'),
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
