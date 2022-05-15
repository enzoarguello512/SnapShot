import Form from "./index";
import TestRenderer from "react-test-renderer"; // ES6
import React from "react";

let component;
const props = {
  history: {},
  handleSubmit: () => {},
};

describe("<Form />", () => {
  beforeEach(() => {
    component = TestRenderer.create(<Form {...props} />);
  });

  it("Render correctly", () => {
    expect(component).toBeDefined();
    expect(component.toJSON().type).toEqual("form");
    expect(component.root.findByType("input")).toBeDefined();
    expect(component.root.findByType("button")).toBeDefined();
    expect(component.root.findByType("svg")).toBeDefined();
  });

  it("The button should be enabled if the input does not have an empty value", () => {
    const form = component.root.findByType("form");
    const input = form.findByType("input");
    const button = form.findByType("button");

    expect(button.props.disabled).toBeTruthy();
    expect(button.className).toEqual("search-button null");

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: "crow" } });
    });

    expect(button.props.disabled).toBeFalsy();
    expect(button.className).toEqual("search-button active");
  });

  it("onSubmit should be called without problems", () => {
    const form = component.root.findByType("form");
    form.props.onSubmit();
  });
});
