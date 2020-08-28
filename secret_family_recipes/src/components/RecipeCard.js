
import React, { useState } from "react";
import EditForm from "./EditForm";
import { connect } from "react-redux";
import { deleteRecipes, editRecipes } from "../actions/recipesActions";
import { tempData } from './tempData'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";


// Lynda
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function RecipeCard(props) 
{
  let { image_url, title, categories, source, ingredients, id, instructions } =  props.item; //pass editable as true to have an edit button


  const {editable} = props;
  const [edit, setEdit] = useState(false);

  const [ open, setOpen ] = React.useState( false );

  const handleClickOpen = () => { setOpen( true ); };

  const handleClose = () => { setOpen( false ); };
  
  const deleteRecipe = id => { props.deleteRecipes( id ); }



  const [ formValues, setFormValues ] = useState( { title, source } );

  const onChange = e => { setFormValues( { ...formValues, [ e.target.name ]: e.target.value } );
                        console.log( formValues ) };

  const editRecipe = id => 
  { 
    props.editRecipes( id, formValues );
    handleClose(); 
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Recipe</DialogTitle>
        <DialogContent>

          <TextField
            margin = "dense"
            label = "Recipe Name"
            type = "text"
            name = "title"
            value = { formValues.title }
            onChange = { onChange }
            fullWidth
          />

          <TextField
            margin = "dense"
            label = "Source"
            type = "text"
            name = "source"
            value = { formValues.source }
            onChange = { onChange }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick = { () => editRecipe( id ) } color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Accordion className="recipe-card">
      <AccordionSummary>
        {/* {(image_url != '' && 
          image_url != undefined) &&
          <img src={image_url} alt={"picture of " + title} />
        } */}
        <h3>
          { formValues.title }, from <span className="card-source">{ formValues.source }</span>
        </h3>
      </AccordionSummary>
      <AccordionDetails>
        <div className="card-ingredients">
          <ul>
            {ingredients &&
              ingredients.map((i, index) => {
                return (
                  <li key={index}>
                    {i.quantity}, {i.ingredient}
                  </li>
                );
              })}
          </ul>
        </div>

        <p>instructions{instructions}</p>
        { editable && <Button variant="outlined" color="primary" onClick={ handleClickOpen } > Edit </Button> }
        { editable && <Button variant="outlined" color="primary" onClick={ () => deleteRecipe( id ) } > Delete</Button> }

      </AccordionDetails>
    </Accordion>
  </>
  );
}

export default connect( null, { deleteRecipes, editRecipes } )( RecipeCard );