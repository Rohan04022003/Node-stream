# Video Streaming with Node Stream

This project demonstrates how to stream video content efficiently using **Node.js Streams**.  
The goal of this project is to provide smooth, progressive video playback without relying on any external video-control libraries on the frontend.

## Overview

The backend is built using **Node.js** and uses the native streaming capabilities of Node to deliver video data in chunks. Instead of loading the entire video file at once, the server responds to range-based requests and streams only the required parts of the video. This ensures faster startup, efficient bandwidth usage, and a better user experience even on slower networks.

## Key Features

- **Node Stream-Based Video Delivery**  
  Uses `fs.createReadStream()` to stream video files directly to the client.
  
- **Range Request Support**  
  Browser automatically requests video segments using the `Range` header, and the server responds with partial content.

- **No Video Control Library Used**  
  The frontend uses a simple HTML `<video>` element for playback without any additional libraries or custom controls.

- **Efficient and Lightweight**  
  Pure Node.js streaming without unnecessary dependencies.

## How It Works

1. The browser sends a request for the video file along with a `Range` header.
2. The server calculates the appropriate byte range and streams only the required portion of the video.
3. As the user seeks, pauses, or plays the video, new range requests are made automatically.
4. The entire process ensures fast loading and efficient streaming using native Node.js capabilities.

## Requirements

- Node.js (v14+ recommended)
- Any modern browser that supports range-based video streaming

## Purpose

This project is intended for developers who want to understand:
- How video streaming works at a low-level in Node.js  
- How browsers communicate using range requests  
- How to implement lightweight streaming without heavy players or libraries  

## Disclaimer

This project is for learning and demonstration purposes.  
It does not use adaptive bitrate streaming (HLS/DASH) and does not include advanced video controls.

## License

This project is open-source and free to use for educational purposes.
