import React from "react";
import TestRenderer from "react-test-renderer";
import Container from "../Container";
import Gallery from "../Gallery";
/* import Loader from "../Loader"; */
import PhotoContextProvider from "../../context/PhotoContext";

import axios from "axios";

let component;

describe("<Container />", () => {
  beforeEach(async () => {
    await TestRenderer.act(async () => {
      component = await TestRenderer.create(
        <PhotoContextProvider>
          <Container searchTerm="" />
        </PhotoContextProvider>
      );
    });
  });

  it("Render correctly", () => {
    expect(component.root).toBeDefined();
    expect(component.root.findByType(Container)).toBeDefined();

    /* expect(component.root.findByType(Loader)); */

    expect(component.root.findAllByType(Gallery).length).toEqual(1);
  });

  it("Call the API if necessary or if the text changes", async () => {
    const customData = {
      data: {
        photos: {
          photo: [
            {
              farm: "farmTest01",
              server: "serverTest",
              id: "testId01",
              secret: "asdadgsfad",
              title: "titleTest01",
            },
          ],
        },
      },
    };

    axios.get.mockImplementation(() => Promise.resolve(customData));

    await TestRenderer.act(async () => {
      await component.update(
        <PhotoContextProvider>
          <Container searchTerm="text" />
        </PhotoContextProvider>
      );
    });

    expect(axios.get).toHaveBeenCalled();

    expect(axios.get).toHaveBeenCalledTimes(3);

    expect(axios.post).not.toHaveBeenCalled();
    expect(axios.put).not.toHaveBeenCalled();

    expect(component.root.findByType(Gallery).props.data).toEqual(
      customData.data.photos.photo
    );
  });
});
