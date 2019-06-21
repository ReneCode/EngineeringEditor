import React from "react";
import { Link } from "react-router-dom";
import PageNavigation from "./PageNavigation/PageNavigation";
import switchFullscreen from "../utils/switchFullscreen";

const Topbar = (props: any) => {
  const userName = "Ann Smith";

  return (
    <nav
      className="menu border-bottom"
      onClick={() => {
        switchFullscreen(true);
      }}>
      <ul className="menu-left">
        <li className="text">
          <Link to="/" className="link">
            Engineering-Editor
          </Link>
        </li>
      </ul>
      <ul className="menu-center">
        <PageNavigation />
      </ul>
      <ul className="menu-right">
        <li className="text">{userName}</li>
        <li className="text">{process.env.REACT_APP_VERSION}</li>

        {/* <li className="button" onClick={props.signin}>
          Signin
        </li>

        <li className="button" onClick={props.signout}>
          Signout
        </li> */}
      </ul>
    </nav>
  );
};

export default Topbar;
