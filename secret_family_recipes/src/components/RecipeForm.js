import React, {useState, useEffect} from 'react';
import * as yup from 'yup';

import recipeSchema from './validation/RecipeSchema';
import Ingredient from './Ingredient';

  const defaultData = {
    'shared': false,
    'photo': '',
    'title': '',
    'category': '',
    'source': '',
    'ingredients': [''],
    'instructions': '',
  }


export default function RecipeForm () {
  const [formData, setFormData] = useState(defaultData);
  const [formErrors, setFormErrors] = useState(['']);
  const [disabled, setDisabled] = useState(false);
  
  const throwErrors = (name, value) => {
    yup
      .reach(recipeSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        });
      })
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        });
      });
 }

  //catch changes and validate. Disable/Enable submit button accordingly
  useEffect(() => {
    recipeSchema.isValid(formData).then(valid => {
    setDisabled(!valid);
    })
  }, [formData])


  //helper function for updating Ingredients array
  function newIngredients(key, value) {
    const result = [...formData.ingredients]
    result[key]= value;
    console.log(result);
    return result;
  }

  function updateForm(e) {
    const {name, value} = e.target;
    if (!isNaN(name)) { //if the name is a number, it's the index of the
                        //ingredients array
      setFormData({...formData,
                    'ingredients': newIngredients(name, value)
                  })            
    }
    throwErrors(name, value);
    setFormData({...formData, [name]: value})
  }
  //Network Request
  function submit(e) {
    e.preventDefault()
    ///////////////
    //POST REQUEST 
    ///////////////
  }

  //add additional input fields for ingredients
  function addIngredient(e) {
    e.preventDefault();
    setFormData({...formData,
      ingredients: [...formData.ingredients, '']})
  }

  return (
    <form className='recipeform' >
      <div className='meta'>
        <label>Recipe Title:&nbsp;
          <input type='text'
                 name='title'
                 value={formData.title}
                 onChange={updateForm}
          />
        </label>
        <label>Category:&nbsp;
          <input type='text'
                 name='category'
                 value={formData.category}
                 onChange={updateForm}
          />
        </label>
        <label>Source:&nbsp;
          <input type='text'
                 name='source'
                 value={formData.source}
                 onChange={updateForm}
          />
        </label>       
        <label>Servings:&nbsp;
          <input type='number'
                 name='servings'
                 value={formData.servings}
                 onChange={updateForm}
          />
        </label>
        <label>Preparation Time:&nbsp;
          <input type='text'
                 name='prepTime'
                 value={formData.prepTime}
                 onChange={updateForm}
          />
        </label>
      </div>
      <div className='ingredients'>
        <label>Ingredients:&nbsp;
          {/*<Ingredient />*/}
          {formData.ingredients.map((item, index) => {
            return (
              <Ingredient ingredient={item}
                          updateForm={updateForm}
                          add={addIngredient}
                          key={index}
                          name={index}
              />
              
            )
          })
          }
        <button onClick={addIngredient}>Add</button>
        </label>
      </div>
      <div className='instructions'>
        <label>instructions:&nbsp;
          <textarea rows='7'
                    cols='80'
                    name='instructions'
                    value={formData.instructions}
                    onChange={updateForm}
          />
        </label>
      </div>
      <div className='submission'>
        <h3>Sharing:</h3>
        <label>Public:
          <input name='shared'
                 type="radio"
                 checked={formData.shared}
                 onChange={() => setFormData({...formData, shared: true})}
          />
        </label>
        <label>Private:
        <input name='shared'
               type="radio"
               checked={!formData.shared}
               onChange={() => setFormData({...formData, shared: false})}
        />
        </label>
      </div>
      <p>{formErrors.title}</p>
      <p>{formErrors.category}</p>
      <p>{formErrors.ingredients}</p>
      <p>{formErrors.instructions}</p>
      
      <button disabled={disabled} onClick={submit} >Add Recipe</button>
    </form>
  )
}