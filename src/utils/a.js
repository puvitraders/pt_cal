const a = {
  roundOff: n => Math.round((n + Number.EPSILON) * 100) / 100,

  getAppreciatedValues: (cost, apr) =>
    apr.map(a => [`apr_${a}`, a, (cost / 100) * a + cost])
};

export default a;
