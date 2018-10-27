import React from "react";
import { Link } from "react-router-dom";

const Topbar = props => {
  const userName = "Ann Smith";

  return (
    <nav className="menu border-bottom">
      <ul className="menu-left">
        <li className="text">
          <Link to="/" className="link">
            Engineering-Editor
          </Link>
        </li>
      </ul>
      <ul className="menu-right">
        <li className="text">{userName}</li>
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
