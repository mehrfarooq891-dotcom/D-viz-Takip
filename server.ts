import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Vite middleware for development
  let vite;
  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // We handle the routing
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
  }

  async function servePage(req, res, pageFileName) {
    const url = req.originalUrl;
    try {
      let template;
      const filePath = process.env.NODE_ENV !== "production" 
        ? path.resolve(__dirname, pageFileName)
        : path.resolve(__dirname, "dist", pageFileName);

      template = fs.readFileSync(filePath, "utf-8");
      
      if (process.env.NODE_ENV !== "production") {
        template = await vite.transformIndexHtml(url, template);
      }

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite?.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  }

  app.get("/", (req, res) => servePage(req, res, 'index.html'));
  app.get("/hakkimizda", (req, res) => servePage(req, res, 'hakkimizda.html'));
  app.get("/iletisim", (req, res) => servePage(req, res, 'iletisim.html'));
  app.get("/dolar-kuru-neden-yukseliyor", (req, res) => servePage(req, res, 'dolar-kuru-neden-yukseliyor.html'));
  app.get("/euro-tl-kuru-takibi", (req, res) => servePage(req, res, 'euro-tl-kuru-takibi.html'));
  app.get("/turkiye-enflasyonu-2025", (req, res) => servePage(req, res, 'turkiye-enflasyonu-2025.html'));
  app.get("/doviz-cevirici-nasil-kullanilir", (req, res) => servePage(req, res, 'doviz-cevirici-nasil-kullanilir.html'));
  app.get("/usd-try-paritesi", (req, res) => servePage(req, res, 'usd-try-paritesi.html'));
  app.get("/altin-fiyatlari-doviz-iliskisi", (req, res) => servePage(req, res, 'altin-fiyatlari-doviz-iliskisi.html'));
  app.get("/dolar-almak-icin-en-iyi-zaman", (req, res) => servePage(req, res, 'dolar-almak-icin-en-iyi-zaman.html'));
  app.get("/merkez-bankasi-faiz-kararlari", (req, res) => servePage(req, res, 'merkez-bankasi-faiz-kararlari.html'));
  app.get("/gbp-try-sterlin-analizi", (req, res) => servePage(req, res, 'gbp-try-sterlin-analizi.html'));
  app.get("/dolar-mi-euro-mu-tutmali", (req, res) => servePage(req, res, 'dolar-mi-euro-mu-tutmali.html'));
  app.get("/tl-deger-kaybi-tarihsel", (req, res) => servePage(req, res, 'tl-deger-kaybi-tarihsel.html'));
  app.get("/doviz-bozdurmak-banka-mi-doviz-burosu-mu", (req, res) => servePage(req, res, 'doviz-bozdurmak-banka-mi-doviz-burosu-mu.html'));
  app.get("/sar-try-suudi-riyali", (req, res) => servePage(req, res, 'sar-try-suudi-riyali.html'));
  app.get("/enflasyondan-korunmak-doviz", (req, res) => servePage(req, res, 'enflasyondan-korunmak-doviz.html'));
  app.get("/chf-try-isvicre-frangi", (req, res) => servePage(req, res, 'chf-try-isvicre-frangi.html'));
  app.get("/yurt-disina-para-gonderme", (req, res) => servePage(req, res, 'yurt-disina-para-gonderme.html'));
  app.get("/kripto-para-mi-doviz-mi", (req, res) => servePage(req, res, 'kripto-para-mi-doviz-mi.html'));
  app.get("/dolar-endeksi-dxy-nedir", (req, res) => servePage(req, res, 'dolar-endeksi-dxy-nedir.html'));
  app.get("/emekli-doviz-tasarrufu", (req, res) => servePage(req, res, 'emekli-doviz-tasarrufu.html'));
  app.get("/aed-try-dirhem-kuru", (req, res) => servePage(req, res, 'aed-try-dirhem-kuru.html'));
  app.get("/doviz-hesabi-acmak", (req, res) => servePage(req, res, 'doviz-hesabi-acmak.html'));
  app.get("/kira-odemelerinde-doviz", (req, res) => servePage(req, res, 'kira-odemelerinde-doviz.html'));
  app.get("/doviz-alim-satim-vergileri", (req, res) => servePage(req, res, 'doviz-alim-satim-vergileri.html'));
  app.get("/rub-try-ruble-kuru", (req, res) => servePage(req, res, 'rub-try-ruble-kuru.html'));
  app.get("/doviz-alirken-dikkat-edilmesi-gerekenler", (req, res) => servePage(req, res, 'doviz-alirken-dikkat-edilmesi-gerekenler.html'));
  app.get("/turkiye-cari-acik-doviz-etkisi", (req, res) => servePage(req, res, 'turkiye-cari-acik-doviz-etkisi.html'));
  app.get("/ogrenciler-icin-yurt-disi-doviz-rehberi", (req, res) => servePage(req, res, 'ogrenciler-icin-yurt-disi-doviz-rehberi.html'));

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
