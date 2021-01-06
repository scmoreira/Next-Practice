import React from 'react';
import { css } from '@emotion/react';

const Error404 = props => {
    
    return (<h1
        css={css`
            margin-top: 5rem;
            text-align: center;
        `}
    >{props.message}</h1>);
}

export default Error404;