import React from 'react';

export default function RecipeCard(props) {
  let {title, source, ingredients, instructions, category} = props;
  //temp variable to reduce explosions
  ingredients = ['asdf', 'bar'];
  return (
    <div className='recipe-card'>
      <div className='card-title'>
        <h3>{title}, from <span>{source}</span></h3>
        <button onClick={(e) => {}}>[edit]</button>
      </div>
      <div className='card-ingredients'>
        <ul>
        {ingredients.map((i) => {
          return (
            <li>{i}</li>
          )
        })}
        </ul>
      </div>
      <p>{instructions}</p>
    </div>
  )
}