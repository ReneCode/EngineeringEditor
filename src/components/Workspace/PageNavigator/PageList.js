import React from "react";
import PropTypes from "prop-types";

import PageListItem from "./PageListItem";

const PageList = props => {
  return (
    <div className="pagelist">
      {props.pages.map(p => (
        <PageListItem
          key={p.id}
          onClick={() => props.onClickPage(p)}
          page={p}
          active={props.activePageId === p.id}
        />
      ))}
    </div>
  );
};

PageList.propTypes = {
  activePageId: PropTypes.number,
  pages: PropTypes.array.isRequired,
  onClickPage: PropTypes.func.isRequired,
};

export default PageList;
