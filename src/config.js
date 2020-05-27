const config = {
  gst: 18,

  amz: {
    getClosingFee: cost => {
      let closing_fees = 0;

      if (cost <= 250) {
        closing_fees = 2;
      } else if (cost > 250 && cost <= 500) {
        closing_fees = 5;
      } else if (cost > 500 && cost <= 1000) {
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
  }
};

export default config;
