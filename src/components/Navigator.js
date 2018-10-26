import React from "react";
import PropTypes from "prop-types";

const Navigator = props => {
  const { navigator } = props;
  let component = null;
  /*
  switch (navigator) {
    case "pages":
      return <PageNavigator click={props.clickPage} />;

    case "devices":
      return <DeviceNavigator click={props.clickDevice} />;

    case "parts":
      component = <PartList click={props.clickPart} />;
      break;

    case "redlinings":
      component = (
        <RedliningList
          redlinings={props.redlinings}
          click={props.clickAnnotation}
        />
      );
      break;

    case "greenlinings":
      component = (
        <GreenliningList
          greenlinings={props.greenlinings}
          click={props.clickAnnotation}
        />
      );
      break;

    default:
      return null;
  }

  if (component) {
    return (
      <div className="data-view border-right">
        <div className="scrolling">{component}</div>
      </div>
    );
  }
  */
  return <div className="Navigator">Navigator</div>;
};

Navigator.propTypes = {};

export default Navigator;
