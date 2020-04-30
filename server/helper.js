module.exports = {
  getTotals: (data) => {
    let results = {};
    data.forEach((ele, i) => {
      let key = ele.category;
      let amount = ele.amount;
      if (results[key]) results[key] += amount;
      else if (!results[key]) results[key] = amount;
    });
    return results;
  }
};