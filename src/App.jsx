import React from "react";
import $ from "jquery";
import TransactionList from "./TransactionList.jsx";
import CategoryList from "./CategoryList.jsx";
import AddTransactions from "./AddTransactions.jsx";
import AddCategories from "./AddCategories.jsx";
import Chart from "./Chart.jsx";
import CategoryOptions from "./CategoryOptions.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      allCategories: [],
    };
    this.getTransactions = this.getTransactions.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.createTransactions = this.createTransactions.bind(this);
    this.createCategories = this.createCategories.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
    this.checkState = this.checkState.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
    this.getCategories();
    this.updateCategories();
    this.getTotalByCategory() // binded to test
  }

  getTransactions() {
    // console.log("called getTransactions")
    //this gets all the transactions from the transactions tables
    axios
      .get("http://localhost:3000/transactions")
      .then(
        (transactions) => this.setState({ allTransactions: transactions.data }) //need to fix this, should be like getCategories below
      )
      .catch((err) => console.log({ err }));
  }

  getCategories() {
    //this gets all the categories from the categories tables
    console.log("called getcategories");
    axios
      .get("http://localhost:3000/categories")
      .then(({ data }) => {
        this.setState({
          allCategories: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createTransactions(data) {
    //this creates new transactions and categories
    axios
      .post("http://localhost:3000/transactions", data)
      .then((data) => {
        this.getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCategories(data) {
    axios
      //this creates new categories and their associated budgets only
      .post("http://localhost:3000/categories", data)
      .then((data) => {
        this.getCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTotalByCategory() {
    return axios
      .get('http://localhost:3000/total/')
      .then((results) => console.log(results.data)) // D3 DATA. Might have to iterate over the objects keys and properties to store items
      .catch((err) => console.error(err));
  };

  // this.setState((state) => {
  //   const allCategories = state.allCategories.concat(data);
  //   return {
  //     allCategories,
  //   };
  // });

  //need a function to get all categories and target budget

  updateCategories(data) {
    console.log(data);
    //this updates categories in the option select in the transactions list under categories
    axios
      .put("http://localhost:3000/transactions", data)
      .then(() => {
        // console.log("data:", data);
        this.getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkState() {
    console.log(`this.state:`, this.state);
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Budget Tracker</h1>
          <h1>Visualization</h1>
          <div className="chart">
            <Chart
              getTransaction={this.getTransactions.bind(this)}
              transactions={this.state.allTransactions}
            />
          </div>
        </div>
        <div className="app">
          <div className="main">
            <TransactionList
              categories={this.state.allCategories}
              transactions={this.state.allTransactions}
              update={this.updateCategories.bind(this)}
            />
          </div>
          <div className="sidebar">
            <div className="category">
              <h3>Add Transactions</h3>
              <AddTransactions
                createCategory={this.createCategories.bind(this)}
                createTransactions={this.createTransactions.bind(this)}
              />
            </div>
            <div className="category">
              <h3>Add Categories</h3>
              <CategoryList categories={this.state.allCategories} />
              <AddCategories
                createCategory={this.createCategories.bind(this)}
              />
            </div>
            <button className="btn" onClick={this.checkState}>
              Check State
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
