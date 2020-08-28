import React, { useState, useEffect } from "react";
import * as yup from "yup";

import recipeSchema from "./validation/RecipeSchema";
import Ingredient from "./Ingredient";
import { addRecipes } from "../actions/recipesActions";
import { connect } from "react-redux";

const defaultIngredientObj = { ingredient: "", quantity: "" };

const defaultData = {
  private: false,
  image_url: "",
  title: "",
  categories: [""],
  source: "",
  ingredients: [],
  instructions: [""],
};

function RecipeForm(props) {

  console.log( "HERE" );
  const [formData, setFormData] = useState(defaultData);
  const [formErrors, setFormErrors] = useState([""]);
  const [disabled, setDisabled] = useState(false);
  const { setEdit } = props;
 
  useEffect(() => {
    setFormData({private: props.private,
                 title: props.title,
                 categories: props.categories,
                 source: props.source,
                 ingredients: props.ingredients,
                 instructions: props.instructions,
  })}, [])

  function updateFormArray(e, index) {
    const { name, value } = e.target;
    const newArr = [...formData[name]];
    newArr[index] = value;

    throwErrors(name, value);
    setFormData({...formData, [name]: newArr})

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
    const updatedIngredients = newIngredients(ingredientObj, index);
    throwErrors('ingredients', updatedIngredients)
    setFormData({
      ...formData,
      ingredients: updatedIngredients
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
        })
      })
      .catch((err) => {
        console.log(err);
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
    setEdit(false);
  }

  return (
    <form className="recipeform">
      <div className="meta">
        <h2>Add a Recipe</h2> 
        <label>
          Recipe Title:&nbsp;
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={updateForm}
          />
        </label>
        <label>Source:&nbsp;
          <input 
            type="text"
            name="source"
            value={formData.source}
            onChange={updateForm}
          />
        </label>
        <label>
          Categories:&nbsp;
          {formData.categories &&
           formData.categories.map((item, index) => {
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
          {formData.ingredients &&
           formData.ingredients.map((item, index) => {
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
          Instructions:&nbsp;
          <textarea
            rows="7"
            cols="70"
            name="instructions"
            value={formData.instructions[0]}
            onChange={(e) => updateFormArray(e, 0)}
          />
        </label>
      </div>
      <div className="submission">
        <h3>Sharing:</h3>
        <label>
          Public:&nbsp;
          <input
            name="shared"
            type="radio"
            checked={formData.private}
            onChange={() => setFormData({ ...formData, private: true })}
          />
        </label>
        <label> 
          <div className="sharing">
            Private:&nbsp;
            <input
              name="shared"
              type="radio"
              checked={!formData.private}
              onChange={() => setFormData({ ...formData, private: false })}
            />
          </div>
        </label>
      </div>
      <p>{formErrors.title}</p>
      <p>{formErrors.categories}</p>
      <p>{formErrors.ingredients}</p>
      <p>{formErrors.instructions}</p>

      <button disabled={disabled} onClick={submit}>
        Submit
      </button>
    </form>
  );
}

export default connect(null, { addRecipes })(RecipeForm);