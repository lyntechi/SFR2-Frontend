import * as yup from "yup";

const recipeSchema = yup.object().shape({
  shared: yup.boolean(),
  photo: yup.string(),
  source: yup.string().max(100),
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .required("A Title is Required"), 
  categories: yup
    .array()
    .required("Must Include a category"),
  ingredients: yup
    .array()
    .min(1, "You must include at least one Ingredient")
    .required("Ingredients are required"),
  instructions: yup
    .array()
    .min(1, "you must include instructions for your recipe"),
});

export default recipeSchema;

//   .notOneOf(["waffle@syrup.com"], "That email is already Taken.")
