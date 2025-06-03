import React from "react";
import type { Asset } from "../types/types";

interface Props {
  assets: Asset[];
}

export const PortfolioSummary: React.FC<Props> = ({ assets }) => {
  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const averageChange = assets.length
    ? assets.reduce((sum, a) => sum + a.change, 0) / assets.length
    : 0;

  return (
    <div>
      <h3>Portfolio Summary</h3>
      <p>Total Value: ${totalValue.toFixed(2)}</p>
      <p>Average Change: {averageChange.toFixed(2)}%</p>
    </div>
  );
};
