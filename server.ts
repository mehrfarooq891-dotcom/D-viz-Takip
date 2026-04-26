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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
