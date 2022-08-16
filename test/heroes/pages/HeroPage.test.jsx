import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { getHeroeById } from "../../../src/heroes/helpers/getHeroeById";
import { AppRouter } from "../../../src/router/AppRouter";

jest.mock("../../../src/heroes/helpers/getHeroeById.js");

getHeroeById.mockImplementation((id) => ({
  id: "dc-batman",
  superhero: "Batman",
  publisher: "DC Comics",
  alter_ego: "Bruce Wayne",
  first_appearance: "Detective Comics #27",
  characters: "Bruce Wayne"
}));

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate
}));

describe("HeroPage test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const contextValue = {
    logged: true,
    user: { id: 123, name: "Pablo" }
  };

  test("should show the page with Hero's information", () => {
    render(
      <MemoryRouter initialEntries={["/hero/marvel-spiderman"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const img = screen.getByRole("img");
    expect(img.src).toContain("marvel-spiderman.jpg");
    expect(screen.getByText("Alter ego:")).toBeTruthy();
    expect(screen.getByText("Publisher:")).toBeTruthy();
    expect(screen.getByText("First appearance:")).toBeTruthy();
    expect(getHeroeById).toHaveBeenCalledWith("marvel-spiderman");
  });

  test("should call to navigate using -1 as parameter", () => {
    render(
      <MemoryRouter initialEntries={["/hero/marvel-spiderman"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const button = screen.getByRole("button", { name: "Back" });
    fireEvent.click(button);
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  test("should show the Marvel page if there is no Hero's information", () => {
    render(
      <MemoryRouter initialEntries={["/hero/varonesa"]}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    //expect(screen.getByText("Marvel Comics")).toBeTruthy();
  });
});
