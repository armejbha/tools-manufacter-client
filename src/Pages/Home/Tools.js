import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';
import Tool from './Tool';

const Tools = () => {
    const { data: products, isLoading } = useQuery('products', () =>
        fetch('https://pure-shore-37595.herokuapp.com/products')
            .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mx-12'>
            <h2 className='text-center text-4xl my-16'>Our Making Product</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    products.map(product => <Tool
                        key={product._id}
                        product={product}
                    ></Tool>)
                }
            </div>
        </div>
    );
};

export default Tools;