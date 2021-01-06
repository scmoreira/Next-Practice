import React, { useState } from 'react';
import Router from 'next/router';

import useValidation from '../hooks/useValidation';
import validateLogIn from '../validation/validateLogIn';
import firebase from '../firebase';

import Layout from '../components/layout/Layout';
import { Form, Field, InputSubmit, Error } from '../components/ui/Form';

import { css } from '@emotion/react';

const INITIAL_STATE = {
    email: '',
    password: ''
}

const LogIn = () => {

    const [errorLogIn, setErrorLogIn] = useState(false);

    const { values, error, handleChange, handleSubmit, handleBlur } = useValidation(INITIAL_STATE, validateLogIn, logInAccount);

    const { email, password } = values;

    async function logInAccount() {
        try {
            await firebase.logIn(email, password)
            Router.push('/');
        } catch (error) {
            setErrorLogIn(error.message);
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
                    >Log In</h1>
                    <Form onSubmit={handleSubmit} noValidate>
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
                        {error.email && <Error>{error.email}</Error>}
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
                        {error.password && <Error>{error.password}</Error>}
                        {errorLogIn && <Error>{errorLogIn}</Error>}
                        <InputSubmit
                            type='submit'
                            value='Confirm'
                        />
                    </Form>
                </>
            </Layout>
        </div>
    );
}

export default LogIn;