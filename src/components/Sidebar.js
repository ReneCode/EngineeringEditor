import React from "react";
import PropTypes from "prop-types";

import SidebarButton from "./SidebarButton";

const Sidebar = props => {
  return (
    <div className="Sidebar border-right">
      {props.buttons.map(b => {
        return (
          <SidebarButton
            key={b.name}
            active={props.active === b.name}
            text={b.text}
            onClick={() => props.onClick(b)}
          />
        );
      })}
      {/* <div className="horizontal-devider" />
      <SidebarButton
        key="detail"
        active={props.activeDetail}
        text="Details"
        click={() => props.click("detail")}
      /> */}
    </div>
  );
};

Sidebar.propTypes = {
  active: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Sidebar;
