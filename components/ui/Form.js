import styled from '@emotion/styled';

export const Form = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        padding: 2rem;
        font-size: 2rem;
    }
`;

export const Field = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    label {
        flex: 00 150px;
        font-size: 1.8rem;
    }

    input, textarea {
        flex: 1;
        padding: 1rem;
        border: 2px solid var(--gris3);
        border-radius: 3px;
        border-style: inset; 
    }

    textarea {
        height: 300px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    border-radius: 3px;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover {
        cursor: pointer;
    }
`;

export const Error = styled.p`
    padding: 1rem;
    margin: 2rem 0;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #FFF;
    background-color: red;
    text-align: center;
    text-transform: uppercase;
`;