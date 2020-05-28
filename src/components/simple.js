import React from "react";
import SimpleUtils from "../utils/simple_utils";

class Simple extends React.Component {
  su = new SimpleUtils();

  state = this.su.getState();

  componentDidMount = () => {
    this.updateAll();
  };

  updateAll = () => {
    this.setState({ rows: this.su.updateAllRows({ ...this.state }) });
  };

  onCostChange = c => {
    const cost = !isNaN(parseFloat(c)) ? parseFloat(c) : 0;

    this.setState({ cost }, this.updateAll);
  };

  onWeightChange = w => {
    const weight = !isNaN(parseInt(w)) ? parseInt(w) : 499;

    this.setState({ weight }, this.updateAll);
  };

  render() {
    const { cost, weight, aprs, rows } = this.state;

    return (
      <article>
        <div className="form">
          <section>
            <label>Cost</label>
            <input
              type="number"
              value={`${cost}`}
              onChange={e => this.onCostChange(e.target.value)}
            />
          </section>

          <section>
            <label>Weight in grams</label>
            <input
              type="number"
              value={weight}
              onChange={e => {
                this.onWeightChange(e.target.value);
              }}
            />
          </section>
        </div>

        <div className="computed">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>APR Percentage :</th>
                {aprs.map(ap => (
                  <th key={`th_${ap}`}>{ap}&#160;%</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={`row_${r[1]}`} className={r[5]}>
                  <td>{r[0]}</td>
                  <td className="td-hd">
                    {r[3]}
                    <br />({r[2]})
                  </td>
                  {r[4].map((a, i) => (
                    <td key={`${r[1]}_${i}`}>{parseFloat(a).toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    );
  }
}

export default Simple;
