import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Viewer/Login";
import Profile from "./Viewer/Profile";
import Navbar from "./Navbar/Navbar";
import Tracks from "./Viewer/Tracks";
import Artists from "./Viewer/Artists";
import Create from "./Viewer/Create";
import Recent from "./Viewer/Recent";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/create" element={<Create />} />
          <Route path="/recent" element={<Recent />} />
        </Routes>
      </BrowserRouter>
      <Navbar />
    </>
  );
}

export default App;
