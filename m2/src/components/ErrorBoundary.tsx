import React from "react";

interface Props {
  children: React.ReactNode;
}
interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(`Error caught by ErrorBoundary: ${error} ${errorInfo}`);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong while loading component</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
