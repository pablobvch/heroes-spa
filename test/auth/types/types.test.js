import { types } from "../../../src/auth/types/types";

describe("types.js test", () => {
  test("should return the following types", () => {
    expect(types).toEqual({
      login: "[Auth] login",
      logout: "[Auth] Logout"
    });
  });
});
