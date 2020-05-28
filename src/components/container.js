import React, { Component } from "react";
import a from "../utils/a";
import "../static/styles.scss";

class Container extends Component {
  constructor() {
    super();

    this.state = {
      cost: 299,
      aprs: a.getApr(),
      profit: [],
      tra: [],
      weight: 499,
      appreciated: [],
      gst: [],
      referral: [],
      closing: [],
      shipping: [],
      gst_ref: [],
      gst_cls: [],
      gst_shp: [],
      amz_total: [],
      subTotal: [],
      price: []
    };
  }

  componentDidMount = () => {
    this.updateAll();
  };

  onCostChange = c => {
    const cost = !isNaN(parseFloat(c)) ? parseFloat(c) : 0;

    this.setState({ cost }, this.updateAll);
  };

  onWeightChange = w => {
    const weight = !isNaN(parseInt(w)) ? parseInt(w) : 499;

    this.setState({ weight }, this.updateAll);
  };

  updateAll = () => {
    const { cost, weight, aprs } = this.state;
    const appreciated = a.getAppreciatedValues(cost, aprs);
    const profit = a.getProfit(appreciated, cost);
    const gst = a.getGST(appreciated);
    const tra = a.addAll([appreciated, gst], aprs);
    const closing = a.getClosingValues(a.addAll([appreciated, gst], aprs));
    const shipping = a.getShippingValues(aprs, weight);
    const gst_cls = a.getGST(closing);
    const gst_shp = a.getGST(shipping);
    const amz_sub_cost = a.addAll(
      [appreciated, gst, closing, gst_cls, shipping, gst_shp],
      aprs
    );
    console.log(amz_sub_cost);
    const referral = a.getRefferalValues(amz_sub_cost);
    const gst_ref = a.getGST(referral);
    const amz_total = a.addAll(
      [referral, closing, shipping, gst_ref, gst_cls, gst_shp],
      aprs
    );
    const price = a.addAll([appreciated, gst, amz_total], aprs);

    this.setState({
      appreciated,
      profit,
      gst,
      tra,
      referral,
      closing,
      shipping,
      gst_ref,
      gst_cls,
      gst_shp,
      amz_total,
      price
    });
  };

  render() {
    const {
      cost,
      weight,
      aprs,
      appreciated,
      profit,
      gst,
      tra,
      closing,
      referral,
      shipping,
      gst_ref,
      gst_cls,
      gst_shp,
      amz_total,
      price
    } = this.state;

    return (
      <div className="container">
        <header>
          <h2>Simple calculator</h2>
        </header>

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
                <tr>
                  <td>a</td>
                  <td className="td-hd">Appreciated Value</td>
                  {appreciated.map((ap, i) => (
                    <td key={`apr_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr>
                  <td>b</td>
                  <td className="td-hd">
                    G.S.T payable
                    <br />
                    (18% of a)
                  </td>
                  {gst.map((ap, i) => (
                    <td key={`gst_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr className="hg-rd">
                  <td>c</td>
                  <td className="td-hd">
                    Total (returned by Amazon)
                    <br />
                    (a + b)
                  </td>
                  {tra.map((ap, i) => (
                    <td key={`tra_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr>
                  <td>d</td>
                  <td className="td-hd">Referral/Commission</td>
                  {referral.map((ap, i) => (
                    <td key={`ref_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr>
                  <td>e</td>
                  <td className="td-hd">
                    GST on referral
                    <br />
                    (18% of d)
                  </td>
                  {gst_ref.map((ap, i) => (
                    <td key={`gref_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr>
                  <td>f</td>
                  <td className="td-hd">Closing fees</td>
                  {closing.map((ap, i) => (
                    <td key={`cls_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr>
                  <td>g</td>
                  <td className="td-hd">
                    GST on Closing
                    <br />
                    (18% of f)
                  </td>
                  {gst_cls.map((ap, i) => (
                    <td key={`gcls_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr>
                  <td>h</td>
                  <td className="td-hd">Shipping fees</td>
                  {shipping.map((ap, i) => (
                    <td key={`shp_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr>
                  <td>i</td>
                  <td className="td-hd">
                    GST on Shipping
                    <br />
                    (18% of h)
                  </td>
                  {gst_shp.map((ap, i) => (
                    <td key={`gshp_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr className="hg-rd">
                  <td>j</td>
                  <td className="td-hd">
                    Total Amazon's charges
                    <br />
                    (d + e + f + g + h + i)
                  </td>
                  {amz_total.map((ap, i) => (
                    <td key={`amzt_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>

                <tr className="hg-pp">
                  <td>k</td>
                  <td className="td-hd">
                    Selling Price
                    <br />
                    (c + j)
                  </td>
                  {price.map((ap, i) => (
                    <td key={`price_${i}`}>
                      <strong>{a.roundOff(ap)}</strong>
                    </td>
                  ))}
                </tr>

                <tr className="hg-bl">
                  <td>l</td>
                  <td className="td-hd">
                    Profit
                    <br />
                    (cost - a)
                  </td>
                  {profit.map((ap, i) => (
                    <td key={`profit_${i}`}>{a.roundOff(ap)}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </article>
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
