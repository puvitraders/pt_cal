import config from "../config";

const a = {
  roundOff: n => Math.round((n + Number.EPSILON) * 100) / 100,

  getAppreciatedValues: (cost, apr) => apr.map(a => (cost / 100) * a + cost),

  getRefferalValues: cost =>
    cost.map(c => (c / 100) * config.amz.getReferralFee(cost)),

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
