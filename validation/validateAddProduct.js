export default function validateAddProduct(values) {

    let error = {};

    if (!values.productName) {
        error.productName = 'The product name is required';
    }

    if (!values.company) {
        error.company = 'The company name is required';
    }
    if (!values.url) {
        error.url = 'The product URL is required';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        error.url = 'URL not valid';
    }

    if (!values.description) {
        error.description = 'Please, add a description of your product';
    }

    return error;
}