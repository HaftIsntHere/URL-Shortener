// server.js
import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/api/urls", async (req, res) => {
  try {
    const urls = await prisma.url.findMany();
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
});

app.get("/api/shortenurl", async (req, res) => {
  const { url } = req.query;
  try {
    // Generate a unique identifier for the shortened URL
    const shortenTo = Math.random().toString(36).substring(2, 8);

    // Save the original URL and shortened URL in the database
    const newUrl = await prisma.url.create({
      data: { URL: shortenTo, shortenTo: url },
    });

    res.json({ newURL: "localhost:5173/" + newUrl.URL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to shorten URL" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
