import type { Transaction } from "../types";

type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "SET_CURRENCY"; payload: "USD" | "EUR" }
  | { type: "LOAD_STATE"; payload: State };

interface State {
  transactions: Transaction[];
  selectedCurrency: "USD" | "EUR";
}

export const initialState: State = {
  transactions: [],
  selectedCurrency: "USD",
};

export function transactionReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      const updatedState = {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
      localStorage.setItem("appState", JSON.stringify(updatedState));
      return updatedState;
    }
    case "SET_CURRENCY": {
      const updatedState = { ...state, selectedCurrency: action.payload };
      localStorage.setItem("appState", JSON.stringify(updatedState));
      return updatedState;
    }
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}
