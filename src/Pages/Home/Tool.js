import React from 'react';

const Tool = ({ product }) => {
    const { _id, name, description, img, price, moq, stock } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className=''>
                <img className='rounded-md' src={img} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p>Price:${price}/pics</p>
                <p>MOQ:{moq}</p>
                <p>Avalaible:{stock}</p>
                <div className="card-actions">
                    <button className="btn btn-primary w-full">PURCHASE</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;