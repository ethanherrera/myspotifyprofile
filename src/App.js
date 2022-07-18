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
          <Route
            basemname={`/${process.env.PUBLIC_URL}`}
            path="/"
            element={<Login />}
          />
          <Route
            basemname={`/${process.env.PUBLIC_URL}`}
            path="/profile"
            element={<Profile />}
          />
          <Route
            basemname={`/${process.env.PUBLIC_URL}`}
            path="/tracks"
            element={<Tracks />}
          />
          <Route
            basemname={`/${process.env.PUBLIC_URL}`}
            path="/artists"
            element={<Artists />}
          />
          <Route
            basemname={`/${process.env.PUBLIC_URL}`}
            path="/create"
            element={<Create />}
          />
          <Route
            basemname={`/${process.env.PUBLIC_URL}`}
            path="/recent"
            element={<Recent />}
          />
        </Routes>
      </BrowserRouter>
      <Navbar />
    </>
  );
}

export default App;
