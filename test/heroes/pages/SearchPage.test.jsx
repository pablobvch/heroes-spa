import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate
}));

describe("SearchPage test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show default values", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
  test("should show Batman character and the input with the querySelector value", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("batman");
    const img = screen.getByRole("img");
    expect(img.src).toContain("dc-batman.jpg");
    const div = screen.getByLabelText("no-hero-with");
    expect(div.style.display).toBe("none");
  });
  test("show an error if there is no a hero", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=varonesa"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("varonesa");
    const div = screen.getByLabelText("no-hero-with"); //funciona por el aria-label
    expect(div.style.display).toBe("");
  });
  test("show call navigate to the new screen", () => {
    render(
      <MemoryRouter initialEntries={["/search"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const newValue = "superman";
    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { name: "searchText", value: newValue }
    });
    const form = screen.getByRole("form"); //funciona por el aria-label
    fireEvent.submit(form);
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${newValue}`);
  });
});
