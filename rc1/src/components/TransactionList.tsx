import React from "react";
import type { Transaction } from "../types";

interface TransactionListProps {
  transactions: Transaction[];
  onSelect: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onSelect,
}) => (
  <ul>
    {transactions.map((tx) => (
      <li key={tx.id} onClick={() => onSelect(tx.id)}>
        {tx.amount} {tx.currency} - {tx.date.toLocaleDateString()}
      </li>
    ))}
  </ul>
);
