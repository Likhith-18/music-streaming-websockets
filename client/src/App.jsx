import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoPlayer from "./Components/VideoPlayer";
import Home from "./Components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
};

export default App;
