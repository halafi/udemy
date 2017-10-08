import { renderComponent, expect } from "../test_helper";
import CommentList from "../../src/components/comment_list";

describe("CommentList", () => {
  let component;

  beforeEach(() => {
    const state = { comments: ["New Comment", "Other New Comment"] };
    component = renderComponent(CommentList, null, state);
  });

  it("has the correct class", () => {
    expect(component).to.have.class("CommentList");
  });

  it("shows an LI for each comment", () => {
    expect(component.find("li").length).to.equal(2);
  });

  it("shows each comment that is provdied", () => {
    expect(component).to.contain("New Comment");
    expect(component).to.contain("Other New Comment");
  });
});
