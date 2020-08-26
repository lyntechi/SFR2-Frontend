import React, { useState, useEffect } from "react";
import * as yup from "yup";

import recipeSchema from "./validation/RecipeSchema";
import Ingredient from "./Ingredient";
import { addRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";

const defaultIngredientObj = { ingredient: "cheese", quantity: "1" };

const defaultData = {
  private: false,
  image_url: "",
  title: "chicken parm",
  categories: ["chicken"],
  source: "aunt",
  ingredients: [defaultIngredientObj],
  instructions: ["test"],
};

function RecipeForm(props) {
  const [formData, setFormData] = useState(defaultData);
  const [formErrors, setFormErrors] = useState([""]);
  const [disabled, setDisabled] = useState(false);
  const { setEdit } = props;

  function updateFormArray(e, index) {
    const { name, value } = e.target;
    const newArr = [...formData[name]];
    newArr[index] = value;
    setFormData({ ...formData, [name]: newArr });
  }

  function updateForm(e) {
    const { name, value } = e.target;
    throwErrors(name, value);
    setFormData({ ...formData, [name]: value });
  }
  ///Add ingredient input field
  function addIngredient(e) {
    e.preventDefault();
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, defaultIngredientObj],
    });
  }

  function addCategory(e) {
    e.preventDefault();
    setFormData({ ...formData, categories: [...formData.categories, ""] });
  }

  ///get an updated array of ingredients without manipulating state
  function newIngredients(ingredientObj, index) {
    const result = [...formData.ingredients];
    result[index] = ingredientObj;
    return result;
  }
  ///actually change the ingredients array in the form
  function updateIngredients(index, ingredientObj) {
    setFormData({
      ...formData,
      ingredients: newIngredients(ingredientObj, index),
    });
  }
  //watch for changes to ingredientObj, and update the formData with it

  //VALIDATION
  const throwErrors = (name, value) => {
    yup
      .reach(recipeSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
  };

  //catch changes and validate. Disable/Enable submit button accordingly
  useEffect(() => {
    recipeSchema.isValid(formData).then((valid) => {
      setDisabled(!valid);
    });
  }, [formData]);
  //END VALIDATION

  //Network Request
  function submit(e) {
    e.preventDefault();
    props.addRecipes(formData);
    // setEdit(false);
  }

  return (
    <form className="recipeform">
      <div className="meta">
        <label>
          Recipe Title:&nbsp;
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={updateForm}
          />
        </label>
        <label>
          Categories:&nbsp;
          {formData.categories.map((item, index) => {
            return (
              <input
                type="text"
                name="categories"
                value={formData.categories[index]}
                onChange={(e) => updateFormArray(e, index)}
                key={index}
              />
            );
          })}
          <button onClick={addCategory}>Add</button>
        </label>
      </div>
      <div className="ingredients">
        <label>
          Ingredients:&nbsp;
          {/*<Ingredient />*/}
          {formData.ingredients.map((item, index) => {
            return (
              <Ingredient
                item={item}
                updateForm={updateForm}
                add={addIngredient}
                key={index}
                index={index}
                updateIngredients={updateIngredients}
              />
            );
          })}
          <button onClick={addIngredient}>Add</button>
        </label>
      </div>
      <div className="instructions">
        <label>
          instructions:&nbsp;
          <textarea
            rows="7"
            cols="80"
            name="instructions"
            value={formData.instructions[0]}
            onChange={(e) => updateFormArray(e, 0)}
          />
        </label>
      </div>
      <div className="submission">
        <h3>Sharing:</h3>
        <label>
          Public:
          <input
            name="shared"
            type="radio"
            checked={formData.shared}
            onChange={() => setFormData({ ...formData, private: true })}
          />
        </label>
        <label>
          Private:
          <input
            name="shared"
            type="radio"
            checked={!formData.shared}
            onChange={() => setFormData({ ...formData, private: false })}
          />
        </label>
      </div>
      <p>{formErrors.title}</p>
      <p>{formErrors.category}</p>
      <p>{formErrors.ingredients}</p>
      <p>{formErrors.instructions}</p>

      <button disabled={disabled} onClick={submit}>
        Add Recipe
      </button>
    </form>
  );
}

export default connect(null, { addRecipes })(RecipeForm);
