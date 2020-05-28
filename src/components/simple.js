import React from "react";
import SimpleUtils from "../utils/simple_utils";

class Simple extends React.Component {
  su = new SimpleUtils();

  state = this.su.getState();

  componentDidMount = () => {
    this.setState({ rows: this.su.updateAllRows({ ...this.state }) });
  };

  render() {
    const { aprs, rows } = this.state;

    return (
      <div>
        <article>
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
      </div>
    );
  }
}

export default Simple;
