import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const AddReview = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [user] = useAuthState(auth);
    const url = `http://localhost:5000/profile?email=${user?.email}`;
    const { data: profile, isLoading } = useQuery('reviewProfile', () =>
        fetch(url)
            .then(res => res.json()))
    // if (isLoading) {
    //     return <Loading></Loading>
    // }
    const onSubmit = data => {
        if (data.rating > 5 && data.rating < 0) {
            return toast.error('Please Enter Rating 0 to 5')
        }
        const reviewData = {
            name: data.name,
            email: data.email,
            comment: data.comment,
            rating: data.rating,
            picture: profile.img
        }
        const url = 'http://localhost:5000/review';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Review Added')
                navigate('/home')
            })
    };
    return (
        <div className='my-4 flex justify-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center">
                    <h2 className="card-title text-3xl font-bold">Add Review</h2>
                    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text"
                                defaultValue={profile?.name || ''}
                                className="input input-bordered w-full"
                                {...register("name")}
                            />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                readOnly
                                value={user?.email}
                                className="input input-bordered w-full"
                                {...register("email")}
                            />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Comment</span>
                            </label>
                            <input type="text"
                                placeholder="Enter Your Description"
                                className="input input-bordered w-full"
                                {...register("comment", {
                                    required: {
                                        value: true,
                                        message: 'Comment is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.comment?.type === 'required' &&
                                    <span className='text-red-500'>{errors.comment.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input type="number"
                                placeholder="Enter Your Rating"
                                className="input input-bordered w-full"
                                {...register("rating", {
                                    required: {
                                        value: true,
                                        message: 'rating is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.rating?.type === 'required' &&
                                    <span className='text-red-500'>{errors.rating.message}</span>}
                            </label>
                        </div>
                        <input className='btn btn-natural block m-auto w-full font-bold'
                            type="submit" value='Add Review' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;