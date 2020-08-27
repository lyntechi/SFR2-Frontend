import React, { useState, useEffect } from "react";
/* 
So, for this I basically gave each ingredientObj it's
Own Slice of State, and then whenever it's updated
I also (with useEffect) update the state in
the actual form.

This is because I need to put the change in the correct
place in the ingredientObj, copy the ingredients array,
and replace the correct index with ingredientObj and then put it into place in the FormData.

Up to my knees in spread operators.

It was literally impossible for me to keep it straight
in my head, let alone clear in the code (it still isn't)

*/
export default function Ingredient(props) {
  const { index, item, updateIngredients } = props;
  const [ingredientObj, setIngredientObj] = useState({
    ingredient: item.ingredient,
    quantity: item.quantity,
  });

  function updateIngredientObj(e) {
    const { name, value } = e.target;
    setIngredientObj({ ...ingredientObj, [name]: value });
  }

  useEffect(() => {
    updateIngredients(index, ingredientObj);
  }, [ingredientObj]);

  return (
    <div className="ingredient-amount">
      <input
        type="text"
        placeholder="ingredient"
        value={ingredientObj.ingredient}
        onChange={updateIngredientObj}
        name="ingredient"
      />
      <input
        type="text"
        placeholder="quantity"
        value={ingredientObj.quantity}
        onChange={updateIngredientObj}
        name="quantity"
      />
    </div>
  );
}
