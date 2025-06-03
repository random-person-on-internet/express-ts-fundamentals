import React, { useReducer, createContext, useContext } from "react";
import type { Asset } from "../types/types";

interface PortfolioState {
  assets: Asset[];
}

type PortfolioAction =
  | { type: "add"; asset: Asset }
  | { type: "remove"; symbol: string }
  | { type: "update"; asset: Asset };

const PortfolioContext = createContext<
  | {
      state: PortfolioState;
      dispatch: React.Dispatch<PortfolioAction>;
    }
  | undefined
>(undefined);

function portfolioReducer(
  state: PortfolioState,
  action: PortfolioAction
): PortfolioState {
  switch (action.type) {
    case "add":
      return { ...state, assets: [...state.assets, action.asset] };
    case "remove":
      return {
        ...state,
        assets: state.assets.filter((a) => a.symbol !== action.symbol),
      };
    case "update":
      return {
        ...state,
        assets: state.assets.map((a) =>
          a.symbol === action.asset.symbol ? action.asset : a
        ),
      };
    default:
      return state;
  }
}

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(portfolioReducer, { assets: [] });

  return (
    <PortfolioContext.Provider value={{ state, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context)
    throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
};
