import React from "react";
import { shallow, mount } from "enzyme";
import Filter from "./index.js";

it("renders without crashing", () => {
  shallow(<Filter />);
});

it("calls onSubmit on return", () => {
  const submitMock = jest.fn();
  const changeMock = jest.fn();
  const wrapper = mount(<Filter onSubmit={submitMock} onChange={changeMock} />);

  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "abc" } });
  wrapper.find("form").simulate("submit");
  // wrapper.find("input").simulate("keydown", { keyCode: 13, which: 13 });

  expect(changeMock).toHaveBeenCalledWith("abc");
  expect(submitMock).toHaveBeenCalledWith("abc");
});

it("calls onSubmit on clear input", () => {
  const submitMock = jest.fn();
  const changeMock = jest.fn();
  const wrapper = mount(<Filter onSubmit={submitMock} onChange={changeMock} />);

  const input = wrapper.find("input");
  input.simulate("change", { target: { value: "abc" } });
  wrapper.find("button").simulate("click");
  expect(submitMock).toHaveBeenCalledWith("");
});
