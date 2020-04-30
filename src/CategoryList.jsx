import React from "react";

const CategoryList = (props) => (
  <div>
    <div className="category-list">
      {props.categories.map((item, i) => {
        return (
          <div key={i} className="input-data">
            <div className="category-data">Category: {item.category}</div>
            <div className="category-data">Budget: {item.budget}</div>
            <div className="category-data">Remaining: {item.remaining}</div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CategoryList;
