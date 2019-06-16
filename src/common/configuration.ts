import Paper from "paper";
/*

for picking use:

digital color meter


$color1: #151c2d;
$color2: #1c2037;
$color3: #4a7cf9;
$color4: #ccdaff;
$color5: #0b2b7c;
*/

const accentColor = new Paper.Color("#4a7cf9");
const accentColorDimmed1 = "#4a7cf977"; // brighter
const accentColorDimmed2 = "#4a7cf911"; // nearly transparent

class Configuration {
  handleStrokeColor = "#222222";
  handleFillColor = "#eeeeee";

  symbolRefHoverStrokeColor = "magenta";
  itemHoverStrokeColor = accentColor; //"magenta";
  hoverStrokeWidth = 2;

  handleHoverColor = "#bb22bb";

  gripStrokeColor = accentColor;
  gripFillColor = "#ffffff";
  gripHoverStrokeColor = accentColor;
  gripHoverFillColor = accentColor;
  gripDragFillColor = accentColor;

  defaultFillColor = "#847d84e9";
  defaultStrokeColor = "#442244";

  backgroundToolbox = "#DAE3EA";

  boundingBoxStrokeColor = accentColorDimmed1;
  boundingBoxHandleSize = 10;

  selectionBoxStrokeColor = accentColor;
  selectionBoxFillColor = accentColorDimmed2;

  modeHoverColor = accentColor; //"purple";
  modeHighlightColor = accentColor; //"red";
  modeSelectColor = accentColor; //"orange";
}

const configuration = new Configuration();
export default configuration;
