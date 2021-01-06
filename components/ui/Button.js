import styled from '@emotion/styled';

const Button = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    border: 1px solid #d1d1d1;
    border-radius: 3px;
    padding: .8rem 2rem;
    margin: 2rem auto;
    background-color: ${props => props.bgColor ? '#cc4d29' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;

export default Button;