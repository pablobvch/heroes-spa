import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate
}));

describe("Navbar tests", () => {
  const contextValue = {
    logged: true,
    user: {
      id: 123,
      name: "Pablo"
    },
    logout: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show the user name", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Logout" })).toBeTruthy();
  });

  test("should call the logout and navigate after clicking logout button", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const logoutButton = screen.getByRole("button");
    fireEvent.click(logoutButton);
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {
      replace: true
    });
  });
});
