import React from "react";

export default function Ingredient(props) {
  const { ingredient, updateForm, add, name } = props;
  return (
    <input
      type="text"
      value={ingredient.ingredient}
      onChange={updateForm}
      onKeyDown={(e) => e.which === 13 && add}
      name={name}
    />
  );
}
