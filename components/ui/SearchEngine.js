import React, { useState } from 'react';
import Router from 'next/router';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

// Styles
const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;
const ButtonSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    background-color: white;
    border: none;

    &:hover {
        cursor: pointer;
    }
`;

const SearchEngine = () => {

    const [search, setSearch] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (search.trim() === '') return;

        Router.push({
            pathname: '/search',
            query: { q: search }
        });
    }

    return (
        <form
            css={css`position:relative;`}
            onSubmit={handleSubmit}
        >
            <InputText
                type='text'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search product' />
            <ButtonSubmit type='submit' />
        </form>
    );
}

export default SearchEngine;
