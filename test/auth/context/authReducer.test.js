import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe("authReducer test", () => {
  const initialState = { logged: false };

  test("should return the initial State", () => {
    const newState = authReducer(initialState, {});
    expect(newState).toBe(initialState);
  });

  test("login should call the authentication and set the user", () => {
    const action = {
      type: types.login,
      payload: {
        id: 1,
        name: "Pablo Bvch"
      }
    };
    const newState = authReducer(initialState, action);
    expect(newState.logged).toBeTruthy();
    expect(newState.user).toBe(action.payload);
  });

  test("logout should clean the user and assing logged to false", () => {
    const state = {
      logged: true,
      user: {
        id: 123,
        name: "Pablo"
      }
    };
    const action = {
      type: types.logout
    };
    const newState = authReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
