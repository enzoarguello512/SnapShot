import React from "react";
import TestRenderer from "react-test-renderer"; // ES6
import Gallery from "./index";
import NoImages from "../NoImages";
import Images from "../Image";

let component;
const props = {
  data: [],
};

describe("<Gallery />", () => {
  beforeEach(function () {
    component = TestRenderer.create(<Gallery {...props} />);
  });

  it("Render correctly", () => {
    expect(component).toBeDefined();
    expect(component.root.findByType("div")).toBeDefined();
    expect(component.root.findByType("ul")).toBeDefined();
  });

  it("Show NoImages if the data is empty", () => {
    expect(component.root.findByType(NoImages)).toBeDefined();
  });

  it("Render images if data exists or changes", () => {
    const data = [
      {
        farm: "farmTest01",
        server: "serverTest",
        id: "testId01",
        secret: "asdadgsfad",
        title: "titleTest01",
      },
      {
        farm: "farmTest02",
        server: "serverTest",
        id: "testId02",
        secret: "qeqwewrt",
        title: "titleTest02",
      },
      {
        farm: "farmTest03",
        server: "serverTest",
        id: "testId03",
        secret: "asdfsadff",
        title: "titleTest03",
      },
      {
        farm: "farmTest04",
        server: "serverTest",
        id: "testId04",
        secret: "ñlkkjhhñl",
        title: "titleTest04",
      },
    ];

    component.update(<Gallery data={data} />);

    expect(component.root.findAllByType(NoImages).length).toEqual(0);
    expect(component.root.findAllByType(Images).length).toEqual(data.length);
    expect(component.root.findAllByType(Images)[0].props.alt).toEqual(
      data[0].title
    );
  });
});
