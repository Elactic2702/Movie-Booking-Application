import { createStore } from "redux";

const initialState = {
  user: {
    isLoggedIn: Boolean(localStorage.getItem("userId")),
  },
  admin: {
    isLoggedIn: Boolean(localStorage.getItem("adminId")),
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        user: {
          isLoggedIn: true,
        },
      };

    case "USER_LOGOUT":
      localStorage.removeItem("userId");
      return {
        ...state,
        user: {
          isLoggedIn: false,
        },
      };

    case "ADMIN_LOGIN":
      return {
        ...state,
        admin: {
          isLoggedIn: true,
        },
      };

    case "ADMIN_LOGOUT":
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      return {
        ...state,
        admin: {
          isLoggedIn: false,
        },
      };

    default:
      return state;
  }
};

export const userActions = {
  login: () => ({ type: "USER_LOGIN" }),
  logout: () => ({ type: "USER_LOGOUT" }),
};

export const adminActions = {
  login: () => ({ type: "ADMIN_LOGIN" }),
  logout: () => ({ type: "ADMIN_LOGOUT" }),
};

const store = createStore(reducer);

export default store;