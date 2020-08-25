import * as yup from "yup";

const recipeSchema = yup.object().shape({
  shared: yup.boolean(),
  username: yup.string(),
  photo: yup.string(),
  source: yup.string().max(100),
  servings: yup.number(),
  prepTime: yup.string(),
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .required("A Title is Required"),
  category: yup.string().required("Must Include a category"),
  ingredients: yup
    .array()
    .min(2, "You must include at least one Ingredient")
    .required("Ingredients are required"),
  directions: yup
    .string()
    .min(1, "you must include Directions for your recipe"),
});

export default recipeSchema;

//   .notOneOf(["waffle@syrup.com"], "That email is already Taken.")
