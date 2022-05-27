import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading/Loading';

const AllReviews = () => {
    const { data: reviews, isLoading } = useQuery('reviews', () =>
        fetch('http://localhost:5000/reviews')
            .then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    const reverseArray = [...reviews].reverse();
    return (
        <div className='my-12'>
            <h2 className='text-center font-bold text-3xl'>Our Client Review</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    reverseArray.map(review =>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="avatar">
                                <div className="w-48 mx-auto mt-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={review.picture} alt='review' />
                                </div>
                            </div>
                            <div className="card-body items-center">
                                <h2 className="card-title">{review.name}</h2>
                                <p className=''>
                                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className='text-amber-400' icon={faStar}></FontAwesomeIcon>
                                    <FontAwesomeIcon className='text-amber-400' icon={faStarHalfStroke}></FontAwesomeIcon>
                                    <span className='font-semibold'> {review.ratings}</span>
                                </p>
                                <p>{review.comment}</p>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default AllReviews;