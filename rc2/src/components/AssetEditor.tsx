import React from "react";
import type { Asset } from "../types/types";

interface Props {
  asset: Asset;
  onUpdate: (asset: Asset) => void;
}

interface State {
  name: string;
  symbol: string;
  value: string;
  change: string;
}

export class AssetEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { name, symbol, value, change } = props.asset;
    this.state = {
      name,
      symbol,
      value: value.toString(),
      change: change.toString(),
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      State,
      keyof State
    >);
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onUpdate({
      name: this.state.name,
      symbol: this.state.symbol,
      value: parseFloat(this.state.value),
      change: parseFloat(this.state.change),
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          name="symbol"
          value={this.state.symbol}
          onChange={this.handleChange}
        />
        <input
          name="value"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input
          name="change"
          value={this.state.change}
          onChange={this.handleChange}
        />
        <button type="submit">Update Asset</button>
      </form>
    );
  }
}
