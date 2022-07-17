import React from "react";
import {
  IoAddCircleOutline,
  IoMusicalNotes,
  IoPersonCircleOutline,
  IoPeople,
  IoListSharp,
} from "react-icons/io5";
function Navbar() {
  return (
    <div className="flex flex-row fixed bottom-0 w-screen h-18 m-0 bg-black justify-evenly content-center items-center opacity-90">
      <NavbarButton
        ext="tracks"
        name="Tracks"
        icon={<IoMusicalNotes size="40px" />}
      />
      <NavbarButton
        ext="artists"
        name="Artists"
        icon={<IoPeople size="40px" />}
      />
      <NavbarButton
        ext="create"
        name="Create"
        icon={<IoAddCircleOutline size="40px" />}
      />
      <NavbarButton
        ext="recent"
        name="Recent"
        icon={<IoListSharp size="40px" />}
      />
      <NavbarButton
        ext="profile"
        name="Profile"
        icon={<IoPersonCircleOutline size="40px" />}
      />
    </div>
  );
}

function NavbarButton({ icon, name, ext }) {
  const homeUrl = "http://localhost:3000/";
  return (
    <>
      <a href={homeUrl + ext}>
        <div className="navbarButton">
          <div>{icon}</div>
          <p>{name}</p>
        </div>
      </a>
    </>
  );
}
export default Navbar;
