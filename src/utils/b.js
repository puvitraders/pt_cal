import config from "../config";

const b = {
  getClosingValues: cost => cost.map(c => config.amfba.getClosingFee(c)),

  getShippingValues: (cost, weight) =>
    cost.map(c => config.amfba.getShippingFee(weight)),

  getPickAndPackValues: cost => cost.map(c => 10),

  getStorageValues: cost => cost.map(c => 10)
};

export default b;
