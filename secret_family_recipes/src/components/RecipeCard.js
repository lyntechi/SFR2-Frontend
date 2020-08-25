import React, {useState} from 'react';
import RecipeForm from './RecipeForm';

export default function RecipeCard(props) {
  let {shared,
       photo,
       title,
       categories,
       source,
       ingredients,
       instructions,
       editable} = props;

  const [edit, setEdit] = useState(false);

  //temp variable to reduce explosions
  if (!props.title) {
    ingredients = [
        {'ingredient': 'apples', 'quantity': '3'},
        {'ingredient': 'cinnamon', 'quantity': '1tsp'}
      ];
    title = 'applesauce';
    source = 'Granny Smith';
    instructions = 'Peel apples, Combine ingredients, and cook in a pot.';
    categories = ['snack'];
  }

  if (edit) {
      return <RecipeForm
               shared = {shared}
               photo = {photo}
               title = {title}
               categories = {categories}
               source = {source}
               ingredients = {ingredients}
               instructions = {instructions}
             />
    }



    return (
    <div style={{border: '3px solid black'}} className='recipe-card'>
      <img src={photo} alt={'picture of ' + title}/>
      <div className='card-title'>
        <h3>{title}, from <span className='card-source'>{source}</span></h3>
        {setEdit && <button onClick={() => setEdit(true)}>[edit]</button>}
      </div>
      <div className='card-ingredients'>
        <ul>
        {ingredients.map((i, index) => {
          return (
            <li key={index} >{i.quantity}, {i.ingredient}</li>
          )
        })}
        </ul>
      </div>
      <p>{instructions}</p>
    </div>
  )
}