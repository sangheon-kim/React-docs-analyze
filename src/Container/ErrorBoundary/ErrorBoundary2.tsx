import * as React from "react";

interface ErrorBoundary {
  error: Error;
  errorInfo: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<ErrorBoundary> {
  constructor(props: ErrorBoundary) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    return <h1>에러가 발생했습니다.</h1>;
  }
}
