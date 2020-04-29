import React from "react";

class AddCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputcategory: "",
      inputbudget: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleClick() {
    this.props.createCategory(this.state);
    //call function which adds only category
    this.setState({
      inputcategory: "",
      inputbudget: "",
    });
  }

  render() {
    return (
      <div className="category-form">
        <div className="category-input">
          <input
            type="text"
            name="inputcategory"
            value={this.state.inputcategory}
            onChange={this.handleChange}
            placeholder="Budget Category"
          />
          <input
            type="number"
            name="inputbudget"
            value={this.state.inputbudget}
            onChange={this.handleChange}
            placeholder="Target Budget"
          />
        </div>
        <button
          onClick={(event) => {
            event.preventDefault();
            this.handleClick();
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default AddCategories;
