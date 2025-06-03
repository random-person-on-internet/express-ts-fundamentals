import React, { useReducer, useEffect } from "react";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { transactionReducer, initialState } from "./reducer/transactionReducer";
import type { ConversionRates, Transaction } from "./types";

const conversionRates: ConversionRates = {
  USD: 1,
  EUR: 1.1,
};

function convertAmount(amount: number, from: "USD" | "EUR", to: "USD" | "EUR") {
  const amountInUSD = from === "USD" ? amount : amount * conversionRates.EUR;
  return to === "USD" ? amountInUSD : amountInUSD / conversionRates.EUR;
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem("appState");
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.transactions = parsed.transactions.map((t: any) => ({
        ...t,
        date: new Date(t.date),
      }));
      dispatch({ type: "LOAD_STATE", payload: parsed });
    }
  }, []);

  const handleAddTransaction = (
    amount: number,
    currency: "USD" | "EUR",
    type: "income" | "expense"
  ) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      amount,
      currency,
      type,
      date: new Date(),
    };
    dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SET_CURRENCY",
      payload: e.target.value as "USD" | "EUR",
    });
  };

  const netBalance = state.transactions.reduce((acc, tx) => {
    const converted = convertAmount(
      tx.amount,
      tx.currency,
      state.selectedCurrency
    );
    return tx.type === "income" ? acc + converted : acc - converted;
  }, 0);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Income & Expense Tracker</h1>
      <div>
        <label>Show Balance In: </label>
        <select value={state.selectedCurrency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
      <h2>
        Net Balance: {netBalance.toFixed(2)} {state.selectedCurrency}
      </h2>
      <TransactionForm onSubmit={handleAddTransaction} />
      <TransactionList
        transactions={state.transactions}
        onSelect={(id) => console.log(`Selected Transaction: ${id}`)}
      />
    </div>
  );
};

export default App;
