import React, { Component } from "react";
import a from "../utils/a";

class Container extends Component {
  state = {
    cost: 0,
    aprs: Array.from({ length: 20 }, (v, i) => (i + 1) * 5),
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
    const gst = a.getGST(appreciated);
    const referral = a.getRefferalValues(appreciated);
    const closing = a.getClosingValues(appreciated);
    const shipping = a.getShippingValues(appreciated, weight);
    const gst_ref = a.getGST(referral);
    const gst_cls = a.getGST(closing);
    const gst_shp = a.getGST(shipping);
    const amz_total = a.addAll(
      [referral, closing, shipping, gst_ref, gst_cls, gst_shp],
      aprs
    );
    const price = a.addAll([appreciated, gst, amz_total], aprs);

    this.setState({
      appreciated,
      gst,
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
      gst,
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
      <div>
        <header></header>
        <article>
          <div className="form">
            <section>
              <label>Cost:</label>
              <input
                type="number"
                value={`${cost}`}
                onChange={e => this.onCostChange(e.target.value)}
              />
            </section>

            <section>
              <label>Weight in grams:</label>
              <input
                type="number"
                value={weight}
                onChange={e => {
                  this.onWeightChange(e.target.value);
                }}
              />
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
                    <td>Appreciated Value</td>
                    {appreciated.map((ap, i) => (
                      <td key={`apr_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>G.S.T payable</td>
                    {gst.map((ap, i) => (
                      <td key={`gst_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>Referral/Commission</td>
                    {referral.map((ap, i) => (
                      <td key={`ref_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>GST on referral</td>
                    {gst_ref.map((ap, i) => (
                      <td key={`gref_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>Closing fees</td>
                    {closing.map((ap, i) => (
                      <td key={`cls_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>GST on Closing</td>
                    {gst_cls.map((ap, i) => (
                      <td key={`gcls_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>Shipping fees</td>
                    {shipping.map((ap, i) => (
                      <td key={`shp_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>GST on Shipping</td>
                    {gst_shp.map((ap, i) => (
                      <td key={`gshp_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>Total Amazon's charges</td>
                    {amz_total.map((ap, i) => (
                      <td key={`amzt_${i}`}>{a.roundOff(ap)}</td>
                    ))}
                  </tr>

                  <tr>
                    <td>Selling Price</td>
                    {price.map((ap, i) => (
                      <td key={`price_${i}`}>{a.roundOff(ap)}</td>
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
