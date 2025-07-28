import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const [socket, setSocket] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { roomId } = useParams();

  useEffect(() => {
    // const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/ws/${roomId}`);
    const ws = new WebSocket(`ws://localhost:8000/ws/${roomId}`);
    // console.log(import.meta.env.VITE_WS_LOCAL_URL);

    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onclose = () => console.log("WebSocket closed");

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "room_update") {
        setQueue(msg.data.queue);
        setCurrentVideo(msg.data.current_video);
        setIsPlaying(msg.data.is_playing);
      } else if (msg.type === "play_video") {
        setCurrentVideo(msg.data);
        setIsPlaying(true);
      } else if (msg.type === "pause_video") {
        setIsPlaying(false);
      } else {
        console.log(msg.msg);
      }
    };

    setSocket(ws);

    return () => ws.close();
  }, [roomId]);

  const addVideo = () => {
    const videoUrl = prompt("Enter a YouTube or MP4 video URL:");
    if (videoUrl && socket) {
      socket.send(JSON.stringify({ action: "add_video", video: videoUrl }));
    }
  };

  const playVideo = (video) => {
    if (socket) {
      socket.send(JSON.stringify({ action: "play_video", video }));
    }
  };

  const pauseVideo = () => {
    if (socket) {
      socket.send(JSON.stringify({ action: "pause_video" }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📺 Streaming Room - {roomId}
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={addVideo}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Video
        </button>
        {currentVideo && (
          <button
            onClick={() => {
              if (isPlaying) {
                socket?.send(JSON.stringify({ action: "pause_video" }));
              } else {
                socket?.send(
                  JSON.stringify({ action: "play_video", video: currentVideo })
                );
              }
            }}
            className={`px-4 py-2 rounded text-white ${
              isPlaying
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        )}
        {/* <button
          onClick={pauseVideo}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Pause
        </button> */}
      </div>

      <div className="mb-8">
        {currentVideo ? (
          <ReactPlayer
            url={currentVideo}
            playing={isPlaying}
            controls
            width="100%"
            height="400px"
          />
        ) : (
          <p className="text-gray-500 text-center">No video is playing</p>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-3">🎞️ Queue</h3>
      <div className="flex justify-center gap-6">
        {queue.map((video, index) => (
          <div key={index} className="w-40 text-center">
            <ReactPlayer
              url={video}
              light
              width="160px"
              height="90px"
              onClickPreview={() => playVideo(video)}
            />
            <p className="text-xs break-words mt-1">{video}</p>
            <button
              onClick={() => playVideo(video)}
              className="mt-2 text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
