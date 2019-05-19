/*

for picking use:

digital color meter


$color1: #151c2d;
$color2: #1c2037;
$color3: #4a7cf9;
$color4: #ccdaff;
$color5: #0b2b7c;
*/

const accentColor = "#4a7cf9";

class Configuration {
  boundingBoxStrokeColor = "#1A9FE9";
  boundingBoxHandleSize = 10;
  handleStrokeColor = "#222222";
  handleFillColor = "#eeeeee";

  itemHoverColor = accentColor;
  handleHoverColor = "#bb22bb";

  gripStrokeColor = accentColor;
  gripFillColor = "#ffffff";
  gripHoverStrokeColor = accentColor;
  gripHoverFillColor = accentColor;
  gripDragFillColor = accentColor;

  defaultFillColor = "#bbdd4499";
  defaultStrokeColor = "#442244";

  backgroundToolbox = "#DAE3EA";
}

const configuration = new Configuration();
export default configuration;
