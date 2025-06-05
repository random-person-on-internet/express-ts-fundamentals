import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CommentBox } from "../components/CommentBox";

test("calls onPost with input value and clears input", () => {
  const mockPost = jest.fn();
  render(<CommentBox onPost={mockPost} />);

  const input = screen.getByTestId("comment-input");
  const button = screen.getByText("Post");

  fireEvent.change(input, { target: { value: "Hello World" } });
  fireEvent.click(button);

  expect(mockPost).toHaveBeenCalledWith("Hello World");
  expect(input).toHaveValue("");
});
