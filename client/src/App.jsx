import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./Components/VideoPlayer";
import Home from "./Components/Home";
import Footer from "./Components/Footer"; // Import the Footer

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Router>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomId" element={<VideoPlayer />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
