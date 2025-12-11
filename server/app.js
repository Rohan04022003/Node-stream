import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream, statSync } from "fs";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/video", (req, res) => {
  // Video file ka path
  const filePath = `${__dirname}/public/video.mp4`;

  // File ka size nikal liya (total video ka size)
  const stat = statSync(filePath);
  const fileSize = stat.size;

  // Browser hamesha Range header bhejta hai streaming ke liye
  const range = req.headers.range;
  if (!range) {
    return res.status(400).send("Range header zaroori hai dost");
  }

  // Hum video ko 1MB ke chote chote chunks me bhejenge
  const chunkSize = 10 ** 6; // 1MB

  // Range header se starting byte nikal liya
  const start = Number(range.replace(/\D/g, ""));

  // End byte calculate kiya (start + chunkSize)
  const end = Math.min(start + chunkSize - 1, fileSize - 1);

  // Chunk ka actual size
  const contentLength = end - start + 1;

  // Ye headers browser ko batate hain ki hum partial video bhej rahe hain
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`, // Kitne bytes mil rahe hain
    "Accept-Ranges": "bytes", // Browser seek kar sakta hai
    "Content-Length": contentLength, // Chunk ka size
    "Content-Type": "video/mp4", // File type
  };

  // 206 ka matlab partial content (streaming ke liye must)
  res.writeHead(206, headers);

  // Ab hum file ko stream kar rahe hain, RAM me load nahi kar rahe
  const fileStream = createReadStream(filePath, { start, end });

  // Ye stream browser ko bhej deta hai
  fileStream.pipe(res);
});





app.listen(3000, () => {
  console.log("Server is running on PORT: 3000");
});
