import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const Reviews = () => {
    const { data: reviews, isLoading, refetch } = useQuery('reviews', () =>
        fetch('https://pure-shore-37595.herokuapp.com/reviews')
            .then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }
    const sliceReviews = [...reviews].reverse().slice(0, 3)
    return (
        <div className='mb-16 mx-12'>
            <h2 className='text-center text-4xl my-16'>Our Customer Reviews</h2>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-5'>
                {
                    sliceReviews.map(review =>
                        <div key={review._id} className="card bg-base-100 shadow-xl">
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
            <button className="btn btn-primary block mx-auto my-8">
                <Link to='/allReviews'>See All Reviews</Link>
            </button>
        </div>
    );
};

export default Reviews;