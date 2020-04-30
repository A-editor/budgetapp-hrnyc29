const { Budget } = require('../database/index.js')


module.exports = {
  getTotals: (documents, data) => {
    let results = {};
    data.forEach((ele, i) => {
      let key = ele.category;
      let amount = ele.amount;
      if (results[key]) results[key] += amount;
      else if (!results[key]) results[key] = amount;
      if (results['total']) results['total'] += amount;
      else results['total'] = amount
    });
    
    documents.forEach((ele) => {
      if (results[ele.category]) {
        let difference = ele.budget - results[ele.category]; 
        return Budget.findByIdAndUpdate(ele.id, {remaining: difference}, {new : true}).exec()
        .catch((err) => console.error(err));
      }
    })
    return results;
  }
};