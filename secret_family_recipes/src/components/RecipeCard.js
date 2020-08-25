import React, {useState} from 'react';
import RecipeForm from './RecipeForm';
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';


export default function RecipeCard(props) {
  let {shared,
       photo,
       title,
       categories,
       source,
       ingredients,
       instructions,
       editable} = props; //pass editable as true to have an edit button

  const [edit, setEdit] = useState(false);

  //temp variables to reduce explosions, only show if not passed title
  if (!props.title) {
    photo = 'https://images.unsplash.com/photo-1578895210405-907db486c111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80'
    ingredients = [
        {'ingredient': 'apples', 'quantity': '3'},
        {'ingredient': 'cinnamon', 'quantity': '1tsp'}
      ];
    title = 'applesauce';
    source = 'Granny Smith';
    instructions = 'Peel apples, Combine ingredients, and cook in a pot.';
    categories = ['snack'];
    editable = true;
  }

  //If edit is true, show RecipeForm with all Values.
  if (edit) {
      return <RecipeForm
               shared = {shared}
               photo = {photo}
               title = {title}
               categories = {categories}
               source = {source}
               ingredients = {ingredients}
               instructions = {instructions}
               setEdit = {setEdit}
             />
  }

    return (
    <Accordion className='recipe-card'>
      <AccordionSummary>
        <img src={photo} alt={'picture of ' + title}/>
        <h3>{title}, from <span className='card-source'>{source}</span></h3>
      </AccordionSummary>
      <AccordionDetails>
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
        {editable && <button onClick={() => setEdit(true)}>[edit]</button>}
      </AccordionDetails>
    </Accordion>
  )
}