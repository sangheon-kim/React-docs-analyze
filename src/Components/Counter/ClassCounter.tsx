import React from "react";
import { UserEnvStateContext } from "../../Contexts/UserEnv";
type Props = {};

class ClassCounter extends React.Component<Props> {
  static contextType = UserEnvStateContext;
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let value = this.context;
    console.log(value);
  }

  render() {
    return (
      <div>
        <UserEnvStateContext.Consumer>
          {(value) => JSON.stringify(value)}
        </UserEnvStateContext.Consumer>
      </div>
    );
  }
}

export default ClassCounter;
