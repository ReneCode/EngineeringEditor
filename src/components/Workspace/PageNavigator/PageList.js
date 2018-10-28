import React from "react";
import PropTypes from "prop-types";

const PageList = props => {
  return (
    <div className="pagelist">
      {props.pages.map(p => (
        <div
          className="pagelist-item"
          key={p.id}
          onClick={() => props.onClickPage(p)}>
          {p.name}
        </div>
      ))}
    </div>
  );
};

PageList.propTypes = {
  pages: PropTypes.array.isRequired,
  onClickPage: PropTypes.func.isRequired,
};

export default PageList;
