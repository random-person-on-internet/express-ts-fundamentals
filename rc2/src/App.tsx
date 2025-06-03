import React from "react";
import { AssetForm } from "./components/AssetForm";
import { AssetList } from "./components/AssetList";
import { PortfolioSummary } from "./components/PortfolioSummary";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";

const PortfolioApp: React.FC = () => {
  const { state, dispatch } = usePortfolio();

  return (
    <div>
      <h1>Asset Portfolio</h1>
      <AssetForm onAdd={(asset) => dispatch({ type: "add", asset })} />
      <AssetList
        assets={state.assets}
        onRemove={(symbol) => dispatch({ type: "remove", symbol })}
      />
      <PortfolioSummary assets={state.assets} />
    </div>
  );
};

const App = () => (
  <PortfolioProvider>
    <PortfolioApp />
  </PortfolioProvider>
);

export default App;
