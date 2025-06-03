import React from "react";

interface TransactionFormState {
  amount: string;
  currency: "USD" | "EUR";
  type: "income" | "expense";
}

interface TransactionFormProps {
  onSubmit: (
    amount: number,
    currency: "USD" | "EUR",
    type: "income" | "expense"
  ) => void;
}

export class TransactionForm extends React.Component<
  TransactionFormProps,
  TransactionFormState
> {
  state: TransactionFormState = { amount: "", currency: "USD", type: "income" };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!this.state.amount) return;
    this.props.onSubmit(
      Number(this.state.amount),
      this.state.currency,
      this.state.type
    );
    this.setState({ amount: "", currency: "USD", type: "income" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          value={this.state.amount}
          onChange={(e) => this.setState({ amount: e.target.value })}
          placeholder="Amount"
          required
        />
        <select
          value={this.state.currency}
          onChange={(e) =>
            this.setState({ currency: e.target.value as "USD" | "EUR" })
          }
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <select
          value={this.state.type}
          onChange={(e) =>
            this.setState({ type: e.target.value as "income" | "expense" })
          }
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
