import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';

const Purchase = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const url = `http://localhost:5000/products/${id}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    const onSubmit = data => {
        console.log(data)
    };
    return (
        <div className='grid lg:grid-cols-6 gap-12'>
            <div className="lg:col-span-4 card lg:card-side bg-base-100 shadow-xl">
                <figure className='lg:w-1/2 p-12'>
                    <img src={product.img} alt="Album" />
                </figure>
                <div className="card-body justify-center">
                    <h2 className="card-title">{product.name}</h2>
                    <p className='grow-0 mt-2'>{product.description}</p>
                    <p className='grow-0 mt-2'>Price:${product.price}/pics</p>
                    <p className='grow-0 mt-2'>Min Order:{product.moq}</p>
                    <p className='grow-0 mt-2'>Avalaible:{product.stock}</p>
                </div>
            </div>
            <div className='lg:col-span-2'>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" disabled value={user.displayName} className="input input-bordered w-full max-w-xs"
                                    {...register("name", { required: true })} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" disabled value={user.email} className="input input-bordered w-full max-w-xs"
                                    {...register("email", { required: true })} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" disabled value={product.name} className="input input-bordered w-full max-w-xs"
                                    {...register("productName", { required: true })} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input type="number" className="input input-bordered w-full max-w-xs"
                                    {...register("quantity", { required: true })} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" className="input input-bordered w-full max-w-xs"
                                    {...register("address", { required: true })} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input type="text" className="input input-bordered w-full max-w-xs"
                                    {...register("phoneNumber", { required: true })} />
                            </div>
                            <input type="submit" value='Purchase' className="btn btn-accent w-full max-w-xs text-white mt-2" />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Purchase;