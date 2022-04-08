import React from "react";

export const ContextApp = React.createContext("");

export const initialState = {
  title: "Помощь",
  link: "/feedback",
};

export const linkReducer = (state, action) => {
  switch (action.type) {
    case "setTitle":
      return {
        ...state,
        ...action.payload,
      };
    case "setLink":
      return {
        ...state,
        ...action.payload,
      };
    case "reset":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
