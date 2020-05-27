import React, { Component } from "react";
import a from "../utils/a";

class Container extends Component {
  state = {
    cost: 0,
    aprs: Array.from({ length: 20 }, (v, i) => (i + 1) * 5),
    weight: 499,
    appreciated: []
  };

  onCostChange = e => {
    const cost = !isNaN(parseFloat(e.target.value))
      ? parseFloat(e.target.value)
      : 0;

    if (cost >= 0) {
      this.setState({
        cost,
        appreciated: a.getAppreciatedValues(cost, this.state.aprs)
      });
    }
  };

  render() {
    const { cost, weight, aprs, appreciated } = this.state;

    return (
      <div>
        <header></header>
        <article>
          <div className="form">
            <section>
              <label>Cost:</label>
              <input
                type="number"
                value={`${cost}`}
                onChange={this.onCostChange}
              />
            </section>
            <section>
              <label>Weight in grams:</label>
              <input type="number" value={weight} onChange={() => {}} />
            </section>

            <div className="computed">
              <table>
                <thead>
                  <tr>
                    <th>APRS :</th>
                    {aprs.map(ap => (
                      <th key={`th_${ap}`}>{ap}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Appreciated Values</td>
                    {appreciated.map(ap => (
                      <td key={ap[0]}>{a.roundOff(ap[2])}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
        <footer></footer>
      </div>
    );
  }
}

export default Container;
