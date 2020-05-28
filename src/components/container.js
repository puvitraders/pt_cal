import React from "react";
import "../static/styles.scss";
import Simple from "./simple";
import config from "../config";
import Header from "./header";
import Fba from "./fba";
import Footer from "./footer";

class Container extends React.Component {
  constructor() {
    super();

    this.state = { selected: config.pages[1] };
  }

  updateSelection = selected => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;

    return (
      <>
        <Header updateSelection={this.updateSelection} selected={selected} />

        {selected === config.pages[0] && <Simple />}

        {selected === config.pages[1] && <Fba />}

        <Footer />
      </>
    );
  }
}

export default Container;
