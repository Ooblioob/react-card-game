import React from "react";
import { shallow } from "enzyme";
import Game from "./Game";

beforeEach(() => {
  // Mock out authentication
  const module = require("../../react-auth0-spa");
  jest.spyOn(module, "useAuth0").mockReturnValue({ loading: false });
});

describe("initialize the game component", () => {
  it("renders 9 cards by default", () => {
    const wrapper = shallow(<Game />, { suspenseFallback: false });

    expect(wrapper.find("lazy").length).toBe(9); // lazy components are Card components waiting to be rendered
  });

  it("renders as many cards as specified in props.deckSize", () => {
    const wrapper = shallow(<Game deckSize="5" />, { suspenseFallback: false });

    expect(wrapper.find("lazy").length).toBe(5); // lazy components are Card components waiting to be rendered
  });

  it("renders a Start Over, Shuffle and Unflip buttons", () => {
    const wrapper = shallow(<Game/>);

    console.log(wrapper.debug());

    expect(wrapper.find("StartOverBtn")).toExist();
    expect(wrapper.find("ShuffleBtn")).toExist();
    expect(wrapper.find("UnflipBtn")).toExist();
  });
});
