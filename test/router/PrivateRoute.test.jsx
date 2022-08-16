import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe("Private Route", () => {
  test("Should children if it is authenticated", () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 1,
        name: "Pablo"
      }
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/search?q=batman"]}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Private Route")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/search?q=batman"
    );
  });
});
