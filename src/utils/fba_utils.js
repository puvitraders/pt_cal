import config from "../config";
import a from "./a";
import b from "./b";

class FbaUtils {
  getState = () => ({
    cost: 299,
    weight: 499,
    aprs: Array.from(
      { length: config.apr.length },
      (v, i) => (i + 1) * config.apr.offset
    ),
    rows: [
      ["a", "referral", "per slab", "Referral / Commission", []],
      ["b", "gst_referral", "18% of a", "GST on Referral", []],
      ["c", "closing", "per slab", "Closing", []],
      ["d", "gst_closing", "18% of c", "GST on Closing", []],
      ["e", "picknpack", "per unit", "Pick & Pack", []],
      ["f", "gst_picknpack", "18% of e", "GST on Pick & Pack", []],
      ["g", "storage", "per cubic ft", "Storage", []],
      ["h", "gst_storage", "18% of g", "GST on Storage", []],
      ["i", "shipping", "per weight / region", "Shipping", []],
      ["j", "gst_shipping", "18% of i", "GST on Shipping", []],
      [
        "k",
        "amz_total",
        "total of 'a' to 'j' ",
        "Total Amazon's charges",
        [],
        `hg-rd`
      ],
      ["l", "appreciated", "per APR", "Appreciated Value", []],
      ["m", "gst_appreciated", "18% of l", "GST on Apr value", []],
      ["n", "our_total", "l + m", "Amt. returned by Amazon", [], `hg-rd`],
      ["p", "price", "k + n", "Selling Price", [], `hg-pp`],
      ["Z", "profit", "h - cost", "Profit", [], `hg-bl`]
    ]
  });

  updateAllRows = ({ cost, weight, aprs, rows }) => {
    const appreciated = a.getAppreciatedValues(cost, aprs);
    const profit = a.getProfit(appreciated, cost);
    const gst = a.getGST(appreciated);
    const our_total = a.addAll([appreciated, gst], aprs);
    const closing = b.getClosingValues(our_total);
    const gst_closing = a.getGST(closing);
    const picknpack = b.getPickAndPackValues(aprs);
    const gst_picknpack = a.getGST(picknpack);
    const storage = b.getStorageValues(aprs);
    const gst_storage = a.getGST(storage);
    const shipping = b.getShippingValues(aprs, weight);
    const gst_shipping = a.getGST(shipping);

    const amz_sub_cost = a.addAll(
      [
        appreciated,
        gst,
        closing,
        gst_closing,
        picknpack,
        gst_picknpack,
        storage,
        gst_storage,
        shipping,
        gst_shipping
      ],
      aprs
    );
    const referral = a.getRefferalValues(amz_sub_cost);
    const gst_referral = a.getGST(referral);
    const amz_total = a.addAll(
      [
        referral,
        closing,
        picknpack,
        storage,
        shipping,
        gst_referral,
        gst_closing,
        gst_picknpack,
        gst_picknpack,
        gst_shipping
      ],
      aprs
    );
    const price = a.addAll([appreciated, gst, amz_total], aprs);

    rows.find(r => r[1] === "appreciated")[4] = appreciated;
    rows.find(r => r[1] === "profit")[4] = profit;
    rows.find(r => r[1] === "gst_appreciated")[4] = gst;
    rows.find(r => r[1] === "our_total")[4] = our_total;
    rows.find(r => r[1] === "closing")[4] = closing;
    rows.find(r => r[1] === "gst_closing")[4] = gst_closing;
    rows.find(r => r[1] === "picknpack")[4] = picknpack;
    rows.find(r => r[1] === "gst_picknpack")[4] = gst_picknpack;
    rows.find(r => r[1] === "storage")[4] = storage;
    rows.find(r => r[1] === "gst_shipping")[4] = gst_shipping;
    rows.find(r => r[1] === "shipping")[4] = shipping;
    rows.find(r => r[1] === "gst_storage")[4] = gst_storage;
    rows.find(r => r[1] === "referral")[4] = referral;
    rows.find(r => r[1] === "gst_referral")[4] = gst_referral;
    rows.find(r => r[1] === "amz_total")[4] = amz_total;
    rows.find(r => r[1] === "price")[4] = price;
    return rows;
  };
}

export default FbaUtils;
