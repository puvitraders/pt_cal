import React, { Component } from "react";
import config from "../config";
import a from "../utils/a";

class Fba extends Component {
  //   su = new SimpleUtils();

  state = {
    cost: 299,
    weight: 499,
    aprs: Array.from(
      { length: config.apr.length },
      (v, i) => (i + 1) * config.apr.offset
    ),
    rows: [
      ["a", "referral", "per slab", "Referral / Commission", []],
      ["b", "gst_referral", "18% of a", "GST on Referral", []],
      ["", "closing", "per slab", "Closing", []],
      ["", "gst_closing", "18% of c", "GST on Closing", []],
      ["", "picknpack", "", "Pick & Pack", []],
      ["", "gst_picknpack", "18% of e", "GST on Pick & Pack", []],
      ["", "storage", "", "Storage", []],
      ["", "gst_storage", "18% of e", "GST on Storage", []],
      ["", "shipping", "per weight / region", "Shipping", []],
      ["", "gst_shipping", "18% of e", "GST on Shipping", []],
      ["g", "amz_total", "", "Total Amazon's charges", [], `hg-rd`],
      ["h", "appreciated", "per APR", "Appreciated Value", []],
      ["i", "gst_appreciated", "18% of h", "GST on Apr value", []],
      ["j", "our_total", "h + i", "Amt. returned by Amazon", [], `hg-rd`],
      ["k", "price", "g + j", "Selling Price", [], `hg-pp`],
      ["Z", "profit", "h - cost", "Profit", [], `hg-bl`]
    ]
  };

  componentDidMount = () => {
    this.updateAll();
  };

  updateAll = () => {
    const { cost, weight, aprs, rows } = this.state;

    const appreciated = a.getAppreciatedValues(cost, aprs);
    const profit = a.getProfit(appreciated, cost);
    const gst = a.getGST(appreciated);

    rows.find(r => r[1] === "appreciated")[4] = appreciated;
    rows.find(r => r[1] === "profit")[4] = profit;
    rows.find(r => r[1] === "gst_appreciated")[4] = gst;
    // rows.find(r => r[1] === "our_total")[4] = our_total;
    // rows.find(r => r[1] === "closing")[4] = closing;
    // rows.find(r => r[1] === "shipping")[4] = shipping;
    // rows.find(r => r[1] === "gst_closing")[4] = gst_closing;
    // rows.find(r => r[1] === "gst_shipping")[4] = gst_shipping;
    // rows.find(r => r[1] === "referral")[4] = referral;
    // rows.find(r => r[1] === "gst_referral")[4] = gst_referral;
    // rows.find(r => r[1] === "amz_total")[4] = amz_total;
    // rows.find(r => r[1] === "price")[4] = price;

    this.setState({ rows });
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

export default Fba;
