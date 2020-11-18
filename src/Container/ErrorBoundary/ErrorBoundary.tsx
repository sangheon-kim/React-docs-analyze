import * as React from "react";

interface IErrorBoundary {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  children: any;
  // children: React.ReactElement | React.ReactElement[];
}

class ErrorBoundary extends React.Component<Partial<IErrorBoundary>> {
  state: Omit<IErrorBoundary, "children">;
  constructor(props: IErrorBoundary) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const { children } = this.props;

    if (this.state.error) {
      return (
        <div>
          <p>{this.state.error.toString()}</p>
          <p>{JSON.stringify(this.state.errorInfo?.componentStack)}</p>
        </div>
      );
    } else {
      return children;
    }
  }
}

export default ErrorBoundary;
