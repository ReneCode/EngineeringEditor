import React from "react";
import PropTypes from "prop-types";

const PageList = props => {
  return (
    <div className="pagelist">
      {props.pages.map(p => (
        <div className="pagelist-item" key={p.id}>
          {p.name}
        </div>
      ))}
    </div>
  );
};

PageList.propTypes = {
  pages: PropTypes.array.isRequired,
};

export default PageList;
