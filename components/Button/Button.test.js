import { faItalic } from "@fortawesome/free-solid-svg-icons";
import { Button } from ".";
import { shallow } from "enzyme";

describe("<Button />", () => {
  it("renders its children successfully", () => {
    const wrapper = shallow(<Button>hello</Button>);
    expect(wrapper.find("button").text()).toBe("hello");
  });
});
