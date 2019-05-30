import React from "react";
import Page from "../../../model/Page";

interface IProps {
  active: boolean;
  showCheckbox: boolean;
  checked: boolean;
  page: Page;
  onClick: (page: Page) => void;
}

const PageListItem = (props: IProps) => {
  let className = "list-item";
  if (props.active) {
    className += " active";
  }

  let checkboxClass = "";
  if (true || props.showCheckbox) {
    checkboxClass = "display-on";
  }
  return (
    <div className={className}>
      <div
        className="list-item__name"
        onClick={() => props.onClick(props.page)}>
        {props.page.name}
      </div>
      <div
        className={
          "show-on-select list-item__select" + checkboxClass
        }>
        <input type="checkbox" />
      </div>
    </div>
  );
};

export default PageListItem;
