import * as yup from "yup";

const recipeSchema = yup.object().shape({
  shared: yup.boolean(),
  photo: yup.string(),
  source: yup.string().min(1, 'must include a source'),
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .required("A Title is Required"),
  categories: yup
    .string().required('you must include a category'),
  ingredients: yup
      .array().of(yup
      .object().shape({
        ingredient: yup.string().required('you must include an ingredient'),
        quantity: yup.string().required('you must include a quantity'),
      })),
  instructions: yup
    .string()
    .min(1, "you must include instructions for your recipe"),
});

export default recipeSchema;

//   .notOneOf(["waffle@syrup.com"], "That email is already Taken.")
