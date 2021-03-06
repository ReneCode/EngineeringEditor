import React from "react";
import PropTypes from "prop-types";

import SidebarButton from "./SidebarButton";

export interface ISidebarButton {
  id: string;
  text: string;
  workspace?: boolean;
}

interface IProps {
  buttons: ISidebarButton[];
  onClick: Function;
  active: string;
}

const Sidebar = (props: IProps) => {
  return (
    <div className="Sidebar border-right">
      {props.buttons.map(b => {
        return (
          <SidebarButton
            key={b.id}
            active={props.active === b.id}
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
