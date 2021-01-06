import React, { useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from '../../firebase';

import NavBar from './Nav';
import SearchEngine from '../ui/SearchEngine';
import Button from '../ui/Button';  

import styled from '@emotion/styled';
import { css } from '@emotion/react';

// Styles
const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;
const HeaderDiv = styled.div`
    display: flex;
    align-items: center;
`;
const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    line-height: 0;
    margin-right: 2rem;

    &:hover {
        cursor: pointer;
    }
`; 

const Header = () => {

    const { user, firebase } = useContext(FirebaseContext);

    return (
        <header
            css={css`
                border-bottom: 2px solid var(--gris3);
                padding: 1rem 0;
            `}
        >
            <HeaderContainer>
                <HeaderDiv>
                    <Link href='/'>
                        <Logo>P</Logo>
                    </Link>
                    <SearchEngine />
                    <NavBar />
                </HeaderDiv>
                <HeaderDiv>
                    { user ? (
                        <>
                            <p css={css`margin-right: 2rem;`}>Hello: { user.displayName }</p>
                            <Button
                                bgColor='true'
                                onClick={() => firebase.logOut() }
                            >Log out</Button>
                        </>
                    ) : (
                        <>
                            <Link href='/login'>
                                <Button bgColor='true'>Log in</Button>
                            </Link>
                            <Link href='/signup'>
                                <Button>Sign up</Button>
                            </Link>
                        </>
                    )}
                </HeaderDiv>
            </HeaderContainer>
        </header>
    )
}

export default Header
