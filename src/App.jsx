import React from "react";
import TransactionList from "./TransactionList.jsx";
import CategoryList from "./CategoryList.jsx";
import AddTransactions from "./AddTransactions.jsx";
import AddCategories from "./AddCategories.jsx";
import CategoryOptions from "./CategoryOptions.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [
        {
          date: "2017-08-02",
          description: "EQUATOR",
          amount: -4.0,
          category: "food",
        },
        {
          date: "2017-08-02",
          description: "CHIPOTLE",
          amount: -9.19,
          category: "entertainment",
        },
        {
          date: "2017-08-03",
          description: "BLUE BOTTLE",
          amount: -13.29,
          category: "entertainment",
        },
      ],
      allCategories: [],
    };
  }

  getTransactions() {
    //this gets all the transactions from the transactions tables
    axios
      .get("/api/transactions")
      .then((transactions) =>
        this.setState({ allTransactions: transactions.data })
      )
      .catch((err) => console.log({ err }));
  }

  getCategories() {
    //this gets all the categories from the categories tables
    axios
      .get("/api/categories")
      .then(({ data }) => {
        this.setState((state) => {
          let allCategories = state.allCategories.concat(data);
          newState.allCategories = data;
          return {
            allCategories,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCategory(data) {
    //this creates new transactions and categories under the budget categories list
    axios
      .post("/api/categories", data)
      .then((data) => {
        this.getCategories();
      })
      .catch((err) => {
        console.log(err);
      });

    // this.setState((state) => {
    //   const allCategories = state.allCategories.concat(data);
    //   return {
    //     allCategories,
    //   };
    // });
  }

  //need a function to get all categories and target budget

  updateCategories(category) {
    //this updates categories in the option select in the transactions list under categories
    axios
      .post("/api/transactions", category)
      .then((data) => {
        console.log("data:", data);
        this.getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Budget App</h1>
        <div className="app">
          <TransactionList
            categories={this.state.allCategories}
            transactions={this.state.allTransactions}
            update={this.updateCategories.bind(this)}
          />
          <div className="transactions">
            <h3>Add Transactions</h3>
            <AddTransactions createCategory={this.createCategory.bind(this)} />
          </div>
          <div className="category">
            <h3>Add Categories</h3>
            <CategoryList categories={this.state.allCategories} />
            <AddCategories />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
