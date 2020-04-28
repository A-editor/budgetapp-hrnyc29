import React from "react";
import axios from "axios";
import BudgetInput from "./BudgetInput.jsx";
import TransactionList from "./TransactionList.jsx";
import CategoryList from "./CategoryList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      allCategories: [],
    };
  }

  render() {
    return (
      <div>
        <h1>Budget App</h1>
        <div className="app">
          {/* <TransactionList
            categories={this.state.allCategories}
            transactions={this.state.allTransactions}
          /> */}
          <div className="category">
            <h3>Budget Categories</h3>
            {/* <CategoryList categories={this.state.allCategories} />
            <BudgetInput /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
