import React from "react";

import PageListItem from "./PageListItem";
import Page from "../../../model/Page";

interface IProps {
  pages: Page[];
  activePageId: string;
  onClickPage: (page: Page) => void;
  onCheckPage: Function;
  checkedIds: string[];
}

const PageList = (props: IProps) => {
  const showCheckbox = true; // props.checkedIds.length > 0;
  return (
    <div className="pagelist">
      {props.pages.map(p => (
        <PageListItem
          key={p.id}
          onClick={props.onClickPage}
          page={p}
          showCheckbox={showCheckbox}
          checked={props.checkedIds.includes(p.id)}
          active={"" + props.activePageId === "" + p.id}
        />
      ))}
    </div>
  );
};

export default PageList;
