import React, { Component } from "react";

class Container extends Component {
  state = {
    c: 0
  };

  render() {
    return (
      <div>
        <header></header>
        <article>Main here --> this works</article>
        <footer></footer>
      </div>
    );
  }
}

export default Container;
