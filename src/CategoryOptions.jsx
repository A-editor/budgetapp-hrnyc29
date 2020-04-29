import React from "react";

class CategoryOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newid: props.transactions._id,
      current: [],
      clickedOn: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleOnChange(event) {
    this.props.update({ id: this.state.newid, category: event.target.value });
    this.setState({ current: event.target.value });
    this.handleToggle();
  }

  handleToggle() {
    this.setState((state) => ({
      clickedOn: !state.clickedOn,
    }));
  }

  render() {
    let noCategory = this.props.newcata.map((item) => {
      return (
        <option key={item.id} value={item.inputcategory}>
          {item.category}
        </option>
      );
    });

    if (
      this.props.transactions.category !== "" &&
      this.state.clickedOn === false
    ) {
      return (
        <div onClick={this.handleToggle}>
          {this.props.transactions.category}
        </div>
      );
    } else {
      return (
        <select onChange={this.handleOnChange}>
          <option>none</option>
          {noCategory}
        </select>
      );
    }
  }
}

export default CategoryOptions;
