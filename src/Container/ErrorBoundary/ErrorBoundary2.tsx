import * as React from "react";

interface ErrorBoundary {
  error: Error | null;
}

class ErrorBoundary2 extends React.Component<Partial<ErrorBoundary>> {
  state: ErrorBoundary;
  constructor(props: ErrorBoundary) {
    super(props);

    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // state를 변경해줍니다.
    return { error };
  }

  render() {
    if (!!this.state.error) {
      return <h1>에러가 발생했습니다. 에러 내용: {this.state.error.toString()}</h1>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary2;
