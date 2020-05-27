import config from "../config";

const a = {
  getApr: () =>
    Array.from(
      { length: config.apr.length },
      (v, i) => (i + 1) * config.apr.offset
    ),

  roundOff: n => Math.round((n + Number.EPSILON) * 100) / 100,

  getAppreciatedValues: (cost, apr) => apr.map(a => (cost / 100) * a + cost),

  getProfit: (aprv, cost) => aprv.map(a => a - cost),

  getRefferalValues: cost =>
    cost.map(c => {
      const fee = config.amz.getReferralFee(c);

      return c * ((1 / (1 - (fee / 100 + 0.18 * (fee / 100))) - 1) / 1.18);
    }),

  getClosingValues: cost => cost.map(c => config.amz.getClosingFee(c)),

  getShippingValues: (cost, weight) =>
    cost.map(c => config.amz.getShippingFee(weight)),

  getGST: cost => cost.map(c => (c / 100) * config.gst),

  addAll: (costs, apr) =>
    apr.map((a, i) => {
      let total = 0;
      costs.forEach(c => {
        total += c[i];
      });
      return total;
    })
};

export default a;
