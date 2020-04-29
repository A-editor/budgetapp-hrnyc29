import React from "react";

class AddTransactions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputdate: "",
      inputdescription: "",
      inputamount: "",
      inputcategory: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleClick() {
    this.props.createTransactions(this.state);
    this.props.createCategory(this.state);
    this.setState({
      inputdate: "",
      inputdescription: "",
      inputamount: "",
      inputcategory: "",
    });
  }

  render() {
    return (
      <div id="transactionform" className="category-form">
        <div className="category-input">
          <input
            type="text"
            name="inputdate"
            value={this.state.inputdate}
            onChange={this.handleChange}
            placeholder="Date"
          />
          <input
            type="text"
            name="inputdescription"
            value={this.state.inputdescription}
            onChange={this.handleChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="inputamount"
            value={this.state.inputamount}
            onChange={this.handleChange}
            placeholder="Amount"
          />
          <input
            type="text"
            name="inputcategory"
            value={this.state.inputcategory}
            onChange={this.handleChange}
            placeholder="Budget Category"
          />
          {/* <input
            type="number"
            name="inputbudget"
            value={this.state.inputbudget}
            onChange={this.handleChange}
            placeholder="Target Budget"
          /> */}
        </div>
        <button
          onClick={(event) => {
            this.handleClick();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AddTransactions;
