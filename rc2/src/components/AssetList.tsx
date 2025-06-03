import React from "react";
import type { Asset } from "../types/types";

interface AssetListProps {
  assets: Asset[];
  onRemove: (symbol: string) => void;
}

export const AssetList: React.FC<AssetListProps> = ({ assets, onRemove }) => (
  <ul>
    {assets.map((a) => (
      <li key={a.symbol}>
        {a.name} ({a.symbol}): ${a.value} ({a.change > 0 ? "+" : ""}
        {a.change}%)
        <button onClick={() => onRemove(a.symbol)}>Remove</button>
      </li>
    ))}
  </ul>
);
