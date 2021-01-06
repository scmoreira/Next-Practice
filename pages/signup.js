import React, { useState } from 'react';
import Router from 'next/router';

import useValidation from '../hooks/useValidation';
import validateSignUp from '../validation/validateSignUp';
import firebase from '../firebase';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import { css } from '@emotion/react';

const INITIAL_STATE = {
    name: '',
    email: '',
    password: ''
}

const SignUp = () => {

    const [errorSignUp, setErrorSignUp] = useState(false);

    const { values, error, handleChange, handleSubmit, handleBlur } = useValidation(INITIAL_STATE, validateSignUp, createAccount);

    const { name, email, password } = values;

    async function createAccount() {
        try {
            await firebase.signUp(name, email, password)
            Router.push('/');
        } catch (error) {
            setErrorSignUp(error.message);
        }
    }

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Create Account</h1>
                    <Form onSubmit={handleSubmit} noValidate>
                        <Field>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                value={name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Your Name'
                            />
                        </Field>
                        {error.name && <Error>{ error.name }</Error>}
                        <Field>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                value={email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Your Email'
                            />
                        </Field>
                        {error.email && <Error>{ error.email }</Error>}
                        <Field>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                value={password}
                                onChange={handleChange}
                                placeholder='******'
                            />
                        </Field>
                        {error.password && <Error>{ error.password }</Error>}
                        {errorSignUp && <Error>{ errorSignUp }</Error>}
                        <InputSubmit
                            type='submit'
                            value='Register'
                        />
                    </Form>
                </>
            </Layout>
        </div>
    );
}

export default SignUp;