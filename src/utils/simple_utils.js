import a from "./a";

class SimpleUtils {
  getState = () => ({
    cost: 299,
    weight: 499,
    aprs: a.getApr(),
    rows: [
      ["a", "referral", "per slab", "Referral / Commission", []],
      ["b", "gst_referral", "18% of a", "GST on Referral", []],
      ["c", "closing", "per slab", "Closing", []],
      ["d", "gst_closing", "18% of c", "GST on Closing", []],
      ["e", "shipping", "per weight / region", "Shipping", []],
      ["f", "gst_shipping", "18% of e", "GST on Shipping", []],
      [
        "g",
        "amz_total",
        "a + b + c + d + e + f",
        "Total Amazon's charges",
        [],
        `hg-rd`
      ],
      ["h", "appreciated", "per APR", "Appreciated Value", []],
      ["i", "gst_appreciated", "18% of h", "GST on Apr value", []],
      ["j", "our_total", "h + i", "Amt. returned by Amazon", [], `hg-rd`],
      ["k", "price", "g + j", "Selling Price", [], `hg-pp`],
      ["Z", "profit", "h - cost", "Profit", [], `hg-bl`]
    ]
  });

  updateAllRows = ({ cost, weight, aprs, rows }) => {
    const appreciated = a.getAppreciatedValues(cost, aprs);
    const profit = a.getProfit(appreciated, cost);
    const gst = a.getGST(appreciated);
    const our_total = a.addAll([appreciated, gst], aprs);
    const closing = a.getClosingValues(our_total);
    const shipping = a.getShippingValues(aprs, weight);
    const gst_closing = a.getGST(closing);
    const gst_shipping = a.getGST(shipping);
    const amz_sub_cost = a.addAll(
      [appreciated, gst, closing, gst_closing, shipping, gst_shipping],
      aprs
    );
    const referral = a.getRefferalValues(amz_sub_cost);
    const gst_referral = a.getGST(referral);
    const amz_total = a.addAll(
      [referral, closing, shipping, gst_referral, gst_closing, gst_shipping],
      aprs
    );
    const price = a.addAll([appreciated, gst, amz_total], aprs);

    rows.find(r => r[1] === "appreciated")[4] = appreciated;
    rows.find(r => r[1] === "profit")[4] = profit;
    rows.find(r => r[1] === "gst_appreciated")[4] = gst;
    rows.find(r => r[1] === "our_total")[4] = our_total;
    rows.find(r => r[1] === "closing")[4] = closing;
    rows.find(r => r[1] === "shipping")[4] = shipping;
    rows.find(r => r[1] === "gst_closing")[4] = gst_closing;
    rows.find(r => r[1] === "gst_shipping")[4] = gst_shipping;
    rows.find(r => r[1] === "referral")[4] = referral;
    rows.find(r => r[1] === "gst_referral")[4] = gst_referral;
    rows.find(r => r[1] === "amz_total")[4] = amz_total;
    rows.find(r => r[1] === "price")[4] = price;

    return rows;
  };
}

export default SimpleUtils;
