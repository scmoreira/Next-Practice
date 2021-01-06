import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import useValidation from '../hooks/useValidation';
import validateAddProduct from '../validation/validateAddProduct';
import { FirebaseContext } from '../firebase';

import Layout from '../components/layout/Layout';
import Error404 from '../components/layout/Error404';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import { css } from '@emotion/react';

const INITIAL_STATE = {
    productName: '',
    company: '',
    url: '',
    description: ''
}

const NewProduct = () => {

    const [image, setImage] = useState(null);
    const [errorAdding, setErrorAdding] = useState(false);

    const router = useRouter();
    const { user, firebase } = useContext(FirebaseContext);
    const { values, error, handleChange, handleSubmit, handleBlur } = useValidation(INITIAL_STATE, validateAddProduct, createProduct);

    const { productName, company, url, description } = values;

    const handleFile = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = async () => {
        const uploadTask = await firebase.storage.ref(`products/${image.lastModified}${image.name}`).put(image);
        const downloadURL = await uploadTask.ref.getDownloadURL();
        return downloadURL;
    }

    async function createProduct() {

        const product = {
            productName,
            company,
            url,
            imageURL: await handleUpload(),
            imagePath: image.lastModified + image.name,
            description,
            votes: 0,
            comments: [],
            voters: [],
            created: Date.now(),
            creator: {
                userId: user.uid,
                userName: user.displayName
            }
        }

        try {
            await firebase.db.collection('products').add(product);
            router.push('/');
        } catch (error) {
            setErrorAdding(true);
        }
    }

    return (
        <div>
            <Layout>
                {!user ? <Error404 message='Not authorized. Please, log in or sign up.' /> : (
                    <>
                        <h1
                            css={css`
                                text-align: center;
                                margin-top: 5rem;
                            `}
                        >Add new product</h1>
                        <Form onSubmit={handleSubmit} noValidate>
                            <fieldset>
                                <legend>Product information</legend>
                                <Field>
                                    <label htmlFor='productName'>Product Name</label>
                                    <input
                                        type='text'
                                        id='productName'
                                        name='productName'
                                        value={productName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Your product name'
                                    />
                                </Field>
                                
                                {error.productName && <Error>{error.productName}</Error>}
                                
                                <Field>
                                    <label htmlFor='company'>Company</label>
                                    <input
                                        type='text'
                                        id='company'
                                        name='company'
                                        value={company}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Company name'
                                    />
                                </Field>

                                {error.company && <Error>{error.company}</Error>}

                                <Field>
                                    <label htmlFor='image'>Product Image</label>
                                    <input
                                        type='file'
                                        id='image'
                                        name='image'
                                        accept='image/*'
                                        onInput={ e => handleFile(e) }
                                    />
                                </Field>

                                <Field>
                                    <label htmlFor='url'>URL</label>
                                    <input
                                        type='url'
                                        id='url'
                                        name='url'
                                        value={url}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder= 'Ex: http://yourproduct.com'
                                    />
                                </Field>

                                {error.url && <Error>{error.url}</Error>}

                            </fieldset>

                            <fieldset>
                                <legend>About your product</legend>
                                <Field>
                                    <label htmlFor='description'>Description</label>
                                    <textarea
                                        id='description'
                                        name='description'
                                        value={description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Field>

                                {error.description && <Error>{error.description}</Error>}

                            </fieldset>

                            {errorAdding && <Error>Error adding. Please try again.</Error>}

                            <InputSubmit
                                type='submit'
                                value='Add product'
                            />
                        </Form>
                    </>
                )}
            </Layout>
        </div>
    );
}

export default NewProduct;