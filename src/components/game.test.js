import React from "react";
import { shallow } from "enzyme";
import Game from "./game";

beforeEach(() => {
  // Mock out authentication
  const module = require("../react-auth0-spa");
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
    const wrapper = shallow(<Game />, { suspenseFallback: false });

    expect(wrapper.find("#start-over-btn")).toExist();
    expect(wrapper.find("#shuffle-btn")).toExist();
    expect(wrapper.find("#unflip-btn")).toExist();
  });
});
