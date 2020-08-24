import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .required('Username is Required'),
    password: yup
        .string()
        .min(8, 'Passwords must be at least 8 characters long.')
        .required('Password is Required'),
  });

export default validationSchema