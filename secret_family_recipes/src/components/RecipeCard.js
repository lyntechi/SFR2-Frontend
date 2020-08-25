import React from 'react';

export default function RecipeCard(props) {
  let {title, source, ingredients, instructions, category, photo, setEdit} = props;
  //temp variable to reduce explosions
  if (!props.title) {
    ingredients = ['apples', 'cinnamon'];
    title = 'applesauce';
    source = 'Granny Smith';
    instructions = 'Peel apples, Combine ingredients, and cook in a pot.';
    category = 'snack';
  }

  return (
    <div style={{border: '3px solid black'}} className='recipe-card'>
      <img src={photo} alt={'picture of ' + title}/>
      <div className='card-title'>
        <h3>{title}, from <span className='card-source'>{source}</span></h3>
        {setEdit && <button onClick={setEdit(true)}>[edit]</button>}
      </div>
      <div className='card-ingredients'>
        <ul>
        {ingredients.map((i, index) => {
          return (
            <li key={index} >{i}</li>
          )
        })}
        </ul>
      </div>
      <p>{instructions}</p>
    </div>
  )
}