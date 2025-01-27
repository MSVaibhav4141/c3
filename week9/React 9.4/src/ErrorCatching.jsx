import { Component } from "react";

class ErrorCatcher extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.log("Error caught in ErrorCatcher:", err, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div>
            Something went wrong! 😢
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorCatcher;
