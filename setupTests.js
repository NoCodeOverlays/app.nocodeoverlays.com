import "@testing-library/jest-dom/extend-expect";

const Adapter = require("enzyme-adapter-react-16");

require("enzyme").configure({ adapter: new Adapter() });
