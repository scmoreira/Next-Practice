import React from 'react';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import styled from '@emotion/styled';

const Product = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4rem;
    border-bottom: 1px solid var(--gris3);
`
const Description = styled.div`
    flex: 0 1 80%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`
const Image = styled.img`
    width: 200px;
`
const Title = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;

    :hover {
        cursor: pointer;
    }
`
const Text = styled.p`
    font-size: 1.6rem;
    color: #888;
    margin: 0;
`
const Comments = styled.div`
    display: flex;
    align-items: center;
    margin-top: 2rem;

    div {
        display: flex;
        align-items: center;
        padding: .3rem 1rem;
        margin-right: 2rem;
        border: 1px solid var(--gris3);
    }
    img {
        width: 2rem;
        margin-right: 2rem;
    }
    p {
        font-size: 1.6rem;
        font-weight: 700;
        margin-right: 1rem;
        
        &:last-of-type {
            margin: 0;
        }
    }
`
const Votes = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid var(--gris3);
    padding: 1rem 3rem;

    div {
        font-size: 2rem;
    }
    p{
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
    }
`

const ProductDetails = ({ product }) => {
    
    const { id, productName, description, imageURL, comments, votes, created } = product;
    
    return (
        <Product>
            <Description>
                <div>
                    <Image src={imageURL} />
                </div>
                <div>
                    <Link href='/products/[id]' as={`/products/${id}`}>
                        <Title>{productName}</Title>
                    </Link>
                    <Text>{description}</Text>
                    <Comments>
                        <div>
                            <img src='/static/img/comentario.png' />
                            <p>{comments.length} Comments</p>
                        </div>
                    </Comments>
                    <p>Published: {formatDistanceToNow(new Date(created))}</p>
                </div>
            </Description>
            <Votes>
                <div> &#9650; </div>
                <p>{votes}</p>
            </Votes>
        </Product>
    )
}

export default ProductDetails;