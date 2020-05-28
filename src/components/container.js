import React from "react";
import "../static/styles.scss";
import Simple from "./simple";
import config from "../config";

class Container extends React.Component {
  constructor() {
    super();

    this.state = { selected: config.pages.simple[0] };
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
