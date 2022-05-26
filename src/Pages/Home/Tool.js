import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tool = ({ product }) => {
    const { _id, name, description, img, price, moq, stock } = product;
    const navigate = useNavigate();
    const navigateToPurchase = id => {
        navigate(`/purchase/${id}`)
    }
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className=''>
                <img className='rounded-md' src={img} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p>Price:${price}/piece</p>
                <p>Mininum Order:{moq}</p>
                <p>Avalaible Quantity:{stock}</p>
                <div className="card-actions">
                    <button onClick={() => navigateToPurchase(_id)} className="btn btn-primary w-full">PURCHASE</button>
                </div>
            </div>
        </div>
    );
};

export default Tool;