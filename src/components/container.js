import React from "react";
import "../static/styles.scss";
import Simple from "./simple";

class Container extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <header>
          <h2>Simple calculator</h2>
        </header>

        <Simple />

        <footer>
          <span>
            Copyright © 2020, Puza.in. All rights reserved - Puvi Traders
          </span>
        </footer>
      </div>
    );
  }
}

export default Container;
