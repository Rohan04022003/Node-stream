import React, { useRef } from "react";

const MyVideoPlayer = () => {
  const videoUrl = "http://localhost:3000/video";
  const videoRef = useRef(null);

  return (
    <div className="main-div">
      <video
      className="video-div"
        ref={videoRef}
        src={videoUrl}
        controls
        style={{ background: "#000" }}
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  );
};

export default MyVideoPlayer;
