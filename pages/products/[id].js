import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/Error404';
import { Field, InputSubmit } from '../../components/ui/Form';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import createRouteLoader from 'next/dist/client/route-loader';

const ProductContainer = styled.div`
    @media (min-width:768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`
const Span = styled.span`
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    width: 30%;
    height: auto;
    padding: 3px 10px;
    margin: 3rem 1rem;
`
const ProductMaker = styled.p`
    display: inline;
    text-align: center;
    padding: .2rem 1.6rem;
    margin-left: 2rem;
    background-color: rgba(0,179,126,.1);
    color: #056d4e;
    text-transform: none!important;
    font-weight: 500;
    border-radius: 10px;
`
const Product = () => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [comment, setComment] = useState({});
    const [queryDB, setQueryDB] = useState(true);

    const { firebase, user } = useContext(FirebaseContext);

    const router = useRouter();
    const { query: { id } } = router;

    const { productName, company, description, url, imageURL, imagePath, comments, votes, voters, created, creator } = product;

    useEffect(() => {
        if (id && queryDB) {
            const getProduct = async () => {
                const productQuery = await firebase.db.collection('products').doc(id);
                const product = await productQuery.get();

                if (product.exists) {             // exists is a function of Firestore
                    setProduct(product.data());   // data() is a method of Firestore
                } else {
                    setError(true);
                }
                setQueryDB(false);
            }
            getProduct();
        }
    }, [id, queryDB]);

    const voteProduct = () => {
        if (voters.includes(user.uid)) return;
        
        const newTotal = votes + 1;
        const newVoters = [...voters, user.uid];

        firebase.db.collection('products').doc(id).update({
            votes: newTotal,
            voters: newVoters
        });

        setProduct({
            ...product,
            votes: newTotal
        });

        setQueryDB(true);
    }

    const handleCommentChange = e => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
    }

    const addComment = e => {
        e.preventDefault();

        comment.userId = user.uid;
        comment.userName = user.displayName;

        const newComments = [...comments, comment];

        firebase.db.collection('products').doc(id).update({
            comments: newComments
        });

        setProduct({
            ...product,
            comments: newComments
        });

        setQueryDB(true);
    }

    const isCommentCreator = id => {

        if (creator.userId === id) return true;
    }

    const isProductMaker = () => {
        if (!user) return false;
        if (creator.userId === user.uid) return true;
    }

    const deleteProduct = async () => {
        try {
            await firebase.db.collection('products').doc(id).delete();
            await firebase.storage.ref(`products/${imagePath}`).delete();
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    if (Object.keys(product).length === 0 && !error) return <Spinner />;
    
    return (
        <Layout>
            <>
                { error ? <Error404 message='Product Not Found' /> : (

                    <div className="container">
                        <h1 css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}>{productName}</h1>
                    
                        <ProductContainer>
                            <div>
                                <Span>Published {formatDistanceToNow(new Date(created))}</Span>
                                <Span>By {creator.userName} from {company}</Span>
                                <img src={imageURL} css={css`
                                    display: block;
                                    margin-top: 2rem;
                                    `}                     
                                />
                                <p>{description}</p>

                                {user && (
                                    <>
                                        <h2>Leave a comment</h2>
                                    
                                        <form onSubmit={addComment}>
                                            <Field>
                                                <input
                                                    type='text'
                                                    name='message'
                                                    placeholder='What do you think of this product?'
                                                    onChange={handleCommentChange}
                                                />
                                            </Field>
                                            <InputSubmit
                                                type='submit'
                                                value='Add a comment'
                                            />
                                        </form>
                                    </>
                                )}

                                <h2 css={css` margin: 2rem 0;`}>Comments</h2>

                                {comments.length === 0 && <p>No comments yet</p>}

                                <ul>
                                    {comments.map((comment, i) => (
                                        <li
                                            key={`${comment.userId}-{i}`}
                                            css={css`
                                            border: 1px solid var(--gris3);
                                            padding: 2rem;
                                        `}
                                        >
                                            <p>{comment.message}</p>
                                            <div css={css`
                                            display: inline-flex;
                                            flex-flow: row nowrap;
                                        `}>
                                                <p>By: <span css={css`
                                                    font-weight: bold;
                                                `}
                                                >{comment.userName}</span></p>

                                                {isCommentCreator(comment.userId) && <ProductMaker>Maker</ProductMaker>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <aside>
                                {isProductMaker() && 
                                    <Button onClick={deleteProduct}>Delete product</Button>
                                }
                                <Button
                                    target='_blank'
                                    bgColor='true'
                                    href={url}
                                    css={css` margin: 0;`}
                                >Go to web</Button>

                                {user && <Button onClick={voteProduct}>Vote</Button>}
                            
                                <p css={css`text-align: center;`}>{votes} Votes</p>

                            </aside>
                        </ProductContainer>
                    </div>
                )}
            </>
        </Layout>
    );
}

export default Product;