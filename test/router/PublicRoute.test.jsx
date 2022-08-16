const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../src/auth/context/AuthContext");
const { PublicRoute } = require("../../src/router/PublicRoute");
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("PublicRoute", () => {
  test("should show children when it's no authenticated", () => {
    const contextValue = {
      logged: false
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Public Route")).toBeTruthy();
  });

  test("should navigate when it is authenticated", () => {
    const contextValue = {
      logged: true,
      user: {
        name: "Pablo",
        id: 123
      }
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Marvel Page</h1>}></Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Marvel Page")).toBeTruthy();
  });
});
