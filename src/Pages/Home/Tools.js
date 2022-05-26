import React, { useEffect, useState } from 'react';
import Tool from './Tool';

const Tools = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div>
            <h2 className='text-center text-4xl my-16'>Our Making Tools</h2>
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