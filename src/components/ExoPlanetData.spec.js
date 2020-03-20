import { mount } from "@vue/test-utils";
import ExoPlanetData from "./ExoPlanetData.vue";
import axios from "axios";

describe("ExoPlanetData.vue", () => {
  const wrapper = mount(ExoPlanetData);
  test("HTML Renders", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  test("Data url is valid", () => {
    var dataURL = axios.get(
      "https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets"
    );
    expect(dataURL).toBeTruthy();
  });
});
