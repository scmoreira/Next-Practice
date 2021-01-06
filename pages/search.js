import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useProducts from '../hooks/useProducts';

import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import Error404 from '../components/layout/Error404';

const Search = () => {

    const [result, setResult] = useState([]);
    
    const router = useRouter();
    const { query: { q } } = router;

    const { products } = useProducts('created');

    useEffect(() => {
        const search = q.toLowerCase();
        const filter = products.filter(product => {
            return (
                product.productName.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search) ||
                product.company.toLowerCase().includes(search) ||
                product.creator.userName.toLowerCase().includes(search)
            );
        });

        setResult(filter);
        
    }, [q, products]);

    return (
        <div>
            <Layout>
                <div className='product-list'>
                    <div className='container'>
                        <ul className='bg-white'>
                            
                        {result.length === 0 && <Error404 message='No match' />}
                        
                        { result.map(product => (
                            <ProductDetails
                            key={product.id} 
                            product={product}
                            /> 
                        ))}
                        
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Search;