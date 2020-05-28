const config = {
  pages: [
    ["Simple", "Simple Calculator"],
    ["FBA", "FBA Calculator"]
  ],

  apr: {
    length: 10,
    offset: 5
  },

  gst: 18,

  amz: {
    getClosingFee: cost => {
      let closing_fees = 0;

      if (cost <= 132) {
        closing_fees = 2;
      } else if (cost > 132 && cost <= 315.91) {
        closing_fees = 5;
      } else if (cost > 315.91 && cost <= 692.01) {
        closing_fees = 25;
      } else {
        closing_fees = 50;
      }

      return closing_fees;
    },

    getReferralFee: cost => (cost <= 300 ? 13 : 17),

    getShippingFee: weight => {
      let fee = 1000;

      if (weight < 500) {
        fee = 66;
      } else if (weight >= 500 && weight < 1000) {
        fee = 91;
      } else if (weight >= 1000 && weight < 2000) {
        fee = 111;
      }

      return fee;
    }
  },

  amfba: {
    getClosingFee: cost => {
      let closing_fees = 0;

      if (cost <= 92.47) {
        closing_fees = 25;
      } else if (cost > 92.47 && cost <= 294) {
        closing_fees = 20;
      } else if (cost > 294 && cost <= 679) {
        closing_fees = 12;
      } else {
        closing_fees = 26;
      }

      return closing_fees;
    },

    getReferralFee: cost => (cost <= 300 ? 13 : 17),

    getPnP: () => 10,

    getStorageFee: () => 10,

    getShippingFee: weight => {
      let fee = 1000;

      if (weight < 500) {
        fee = 56;
      } else if (weight >= 500 && weight < 1000) {
        fee = 81;
      } else if (weight >= 1000 && weight < 2000) {
        fee = 101;
      }

      return fee;
    }
  }
};

export default config;
