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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-4xl font-bold">Welcome to VibeSync 🎧🎶</h1>
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
    </div>
  );
};

export default Home;
