import react, {useState} from 'React';

  const defaultData = {
    'username': '',
    'photo': '',
    'title': '',
    'category': '',
    'source': '',
    'servings': '',
    'prepTime': '',
    'ingredients': [''],
    'directions': '',
    'baking-temp': '',
  }

export default function RecipeForm () {
  const [formData, setFormData] = useState(defaultData);
  
  return (
    <form>
      <div className='meta'>
        <label>Recipe Title:&nbsp;
          <input type='text'></input>
        </label>
        <label>Category:&nbsp;
          <input type='text'></input> 
        </label>
        <label>Source:&nbsp;
          <input type='text'></input>
        </label>       
        <label>Servings:&nbsp;
          <input type='number'></input>
        </label>
        <label>Preparation Time:
          <input type='text'></input>
        </label>
      </div>
      <div className='ingredients'>
        <label>Ingredients:&nbsp;
          <Ingredient />
        </label>
      </div>
      <div className='directions'>
        <label>Directions:&nbsp;
          <input type='text'></input>
        </label>
        <label>Temperature&nbsp;
          <input type='text'></input>
        </label>
      </div>
    </form>
  )
}