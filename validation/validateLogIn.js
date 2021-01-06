export default function validateSignUp(values) {

    let error = {};

    if (!values.email) {
        error.email = 'An email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        error.email = 'Invalid email';
    }

    if (!values.password) {
        error.password = 'The password is required';
    } else if (values.password.length < 6) {
        error.password = 'Password must contain at least 6 characters';
    }

    return error;
}