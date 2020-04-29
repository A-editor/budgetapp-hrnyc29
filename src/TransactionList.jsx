import React from "react";
import CategoryOptions from "./CategoryOptions.jsx";

const TransactionList = (props) => (
  <div className="txn">
    <h3>Transactions</h3>
    <div className="txn-table">
      <div className="txn-header txn-row">
        <div className="txn-data">Date</div>
        <div className="txn-data">Description</div>
        <div className="txn-data">Amount</div>
        <div className="txn-data">Category</div>
      </div>
      {props.transactions.map((transaction, i) => {
        return (
          <div className="txn-row">
            <div className="txn-data">{transaction.date.slice(0, 10)}</div>
            <div className="txn-data">{transaction.descr}</div>
            <div className="txn-data">{transaction.amount}</div>
            <div className="txn-data">
              <CategoryOptions
                transactions={props.transactions[i]}
                update={props.update}
                id={transaction.id}
                newcata={props.categories}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default TransactionList;
