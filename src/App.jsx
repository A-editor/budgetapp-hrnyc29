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
        //example data to be removed eventually
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
    this.getTransactions = this.getTransactions.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.createTransactions = this.createTransactions.bind(this)
    this.createCategories = this.createCategories.bind(this)
    this.updateCategories = this.updateCategories.bind(this)
    this.checkState = this.checkState.bind(this)
  }

  componentDidMount() {
    this.getTransactions()
    this.getCategories()
    this.updateCategories()
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
    console.log("called getcategories")
    axios
      .get("http://localhost:3000/categories")
      .then(({ data }) => {
        this.setState((state) => {
          let allCategories = state.allCategories.concat(data);
          return {
            allCategories,
          };
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

    // this.setState((state) => {
    //   const allCategories = state.allCategories.concat(data);
    //   return {
    //     allCategories,
    //   };
    // });
  }

  //need a function to get all categories and target budget

  updateCategories() {
    //this updates categories in the option select in the transactions list under categories
    axios
      .get("http://localhost:3000/transactions")
      .then((data) => {
        // console.log("data:", data);
        this.getTransactions();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  checkState() {
    console.log(`this.state:`, this.state)
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
          <div className="category">
            <h3>Add Transactions</h3>
            <AddTransactions
              createCategory={this.createCategories.bind(this)}
              createTransactions={this.createTransactions.bind(this)}
            />
            <button onClick={this.checkState}>Check State</button>
          </div>
          <div className="category">
            <h3>Add Categories</h3>
            <CategoryList categories={this.state.allCategories} />
            <AddCategories createCategory={this.createCategories.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
