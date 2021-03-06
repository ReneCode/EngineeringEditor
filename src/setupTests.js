import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// https://github.com/hustcc/jest-canvas-mock
import "jest-canvas-mock";

configure({ adapter: new Adapter() });

// jest-fetch-mock
global.fetch = require("jest-fetch-mock");

module.exports = {
  setupTestFrameworkScriptFile: require.resolve("./jest.setup.js"),
  // ... other options ...
};
