import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  };

  const joinRoom = () => {
    const roomId = prompt("Enter Room ID:");
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  };

  // return (
  //   <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
  //     <h1 className="text-4xl font-bold">Welcome to VibeSync 🎧🎶</h1>
  //     <div className="flex space-x-4">
  //       <button
  //         onClick={createRoom}
  //         className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
  //       >
  //         Create Room
  //       </button>
  //       <button
  //         onClick={joinRoom}
  //         className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
  //       >
  //         Join Room
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col min-h-screen p-8 bg-gray-50">
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to VibeSync 🎧🎶</h1>
        <div className="flex space-x-4">
          <button
            onClick={createRoom}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Create Room
          </button>
          <button
            onClick={joinRoom}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Join Room
          </button>
        </div>
      </main>

      <footer className="mt-8 text-gray-500 space-y-1 flex flex-col items-center justify-center text-center">
        <p>
          Made with{" "}
          <span role="img" aria-label="love">
            💖
          </span>{" "}
          by Likhith.
        </p>
        <p>Copyright © 2025 Likhith vibesync-music.ai</p>
      </footer>
    </div>
  );
};

export default Home;
