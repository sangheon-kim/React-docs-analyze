import * as React from "react";

interface IErrorBoundary {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  children: React.ReactElement[] | React.ReactElement;
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
    console.log(this.state.errorInfo);

    if (this.state.error) {
      return (
        <div>
          <p>{this.state.error.toString()}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>{this.state.errorInfo?.componentStack}</p>
        </div>
      );
    } else {
      return children;
    }
  }
}

export default ErrorBoundary;
