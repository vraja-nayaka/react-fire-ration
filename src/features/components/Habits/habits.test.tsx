import React from "react";
import Habits, { HabitsProps } from ".";
import { shallow, ShallowWrapper } from 'enzyme';

const setUp = (props: HabitsProps) => shallow(<Habits {...props} />);

describe("should render Habits component", () => {
  let component: ShallowWrapper;
  beforeEach(() => {
    component = setUp({editHabit: () => void 0, habits: []});
  });

  it("should contain .Grid wrapper", () => {
    const wrapper = component.find(".Grid");
    
    expect(wrapper.length).toBe(1);
  });

  // it("should contain link", () => {
  //   const wrapper = component.find("a");
  //   expect(wrapper.length).toBe(1);
  // });

  // it("should render created date", () => {
  //   const created_at = "01-03-2020";
  //   component = setUp({ created_at });
  //   const date = component.find(".date");
  //   expect(date.text()).toBe(new Date(created_at).toLocaleDateString());
  // });
});
