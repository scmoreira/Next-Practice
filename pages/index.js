import React from 'react';

import useProducts from '../hooks/useProducts';

import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import Spinner from '../components/ui/Spinner';

const Home = () => {

  const { products } = useProducts('created');

  return (
    <div>
      <Layout>
        
        {products.length === 0 && <Spinner />}

        <div className='product-list'>
          <div className='container'>
            <ul className='bg-white'>
            
              { products.map(product => (
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
  )
} 

export default Home;