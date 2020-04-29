import React from "react";

const CategoryList = (props) => (
  <div>
    <div className="category-list">
      {props.categories.map((item, i) => {
        return (
          <div key={i} className="input-data">
            <div className="category-data">{item.inputcategory}</div>
            <div className="budget-data">{item.inputbudget}</div>
          </div>
        );
      })}
    </div>
  </div>
);

export default CategoryList;
