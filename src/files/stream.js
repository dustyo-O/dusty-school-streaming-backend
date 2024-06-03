const fs = require('fs');
const path = require('path');
// const { getVideoDurationInSeconds } = require('get-video-duration');

const stream = (req, res) => {
  // Ensure there is a range given for the video
  const range = req.headers.range || '0';

  const { id } = req.params;

  const videoPath = path.join(process.cwd(), 'upload', id, `1.webm`);
  const videoSize = fs.statSync(videoPath).size;

  // getVideoDurationInSeconds(videoPath).then((duration) => {
  //   console.log(duration);

  //   res.send(duration);
  // });

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/webm",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};

module.exports = stream;
