import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
const Review = ({ review }) => {
    const { _id, name, ratings, picture, comment } = review;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="avatar">
                <div className="w-48 mx-auto mt-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={picture} alt='review' />
                </div>
            </div>
            <div className="card-body items-center">
                <h2 className="card-title">{name}</h2>
                <p className=''>
                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                    <FontAwesomeIcon className='text-amber-400' icon={faStarHalfStroke}></FontAwesomeIcon>
                    <span className='font-semibold'> {ratings}</span>
                </p>
                <p>{comment}</p>
            </div>
        </div>
    );
};

export default Review;