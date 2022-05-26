import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState('');
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const url = `http://localhost:5000/products/${id}`
    const { data: product, isLoading } = useQuery('productInfo', () => fetch(url).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const orderQuantityUpdate = value => {
        if (value && (parseInt(value) >= 0)) {
            const totalCost = parseInt(value) * parseInt(product.price);
            setTotalPrice(totalCost);
        } else {
            const totalCost = 0;
            setTotalPrice(totalCost);
        }
    }
    const onSubmit = data => {
        const orderQuantity = parseInt(data.orderQuantity);
        const minimumOrder = parseInt(product.moq);
        const oldAvalaible = parseInt(product.stock);
        console.log(oldAvalaible);
        const totalPrice = parseInt(product.price) * orderQuantity
        if (orderQuantity < minimumOrder) {
            return toast.error(`Please order minimum ${minimumOrder}`);
        } else if (orderQuantity > oldAvalaible) {
            return toast.error('Your order cross ours avalaible stock');
        }

        const purchase = {
            name: user.displayName,
            product: product.name,
            email: user.email,
            number: data.number,
            address: data.address,
            totalPrice: totalPrice,
            orderQuantity: data.orderQuantity,
            img: product.img
        }
        const url = 'http://localhost:5000/orders';
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(purchase)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Order Purchase Successfully')
                navigate('/home')
            })
        const newAvailable = oldAvalaible - orderQuantity;
        const update = { newAvailable };
        fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(update)
        })
            .then(res => res.json())
            .then(result => console.log(result))
    }


    return (
        <div className='grid lg:grid-cols-6 gap-12'>
            <div className="lg:col-span-4 card lg:card-side bg-base-100 shadow-xl">
                <figure className='lg:w-1/2 p-12'>
                    <img src={product.img} alt="Album" />
                </figure>
                <div className="card-body justify-center">
                    <h2 className="card-title">{product.name}</h2>
                    <p className='grow-0'>{product.description}</p>
                    <p className='grow-0'>Price:${product.price}/piece</p>
                    <p className='grow-0 mt-2'>Minimum Order:{product.moq}</p>
                    <p className='grow-0 mt-2'>Avalaible Quantity:{product.stock}</p>
                    <p className='grow-0 mt-2'>Total Price:{totalPrice}</p>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Your Order Quantity</span>
                        </label>
                        <Controller
                            control={control}
                            name="orderQuantity"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Quantity Number is Required'
                                }
                            }}
                            render={({ field }) => (
                                <input type="number"
                                    defaultValue={product?.moq}
                                    placeholder="Enter Your Order Quantity"
                                    className="input input-bordered w-full max-w-xs"
                                    {...field} ref={e => {
                                        orderQuantityUpdate(field.value);
                                        field.ref(e);
                                    }} />
                            )}
                        />
                        <label className="label">
                            {errors.orderQuantity?.type === 'required' && <span className='text-red-500'>{errors.orderQuantity.message}</span>}
                        </label>
                    </div>
                </div>
            </div>
            <div className='lg:col-span-2'>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" disabled value={user.displayName} className="input input-bordered w-full max-w-xs"
                                    {...register("name")} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" disabled value={user.email} className="input input-bordered w-full max-w-xs"
                                    {...register("email")} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" disabled value={product.name} className="input input-bordered w-full max-w-xs"
                                    {...register("productName")} />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" placeholder='Enter Your Address' className="input input-bordered w-full max-w-xs"
                                    {...register("address",
                                        {
                                            required: {
                                                value: true
                                            }
                                        })} />
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input type="text" placeholder='Enter Your Mobile Number' className="input input-bordered w-full max-w-xs"
                                    {...register("phoneNumber",
                                        {
                                            required: {
                                                value: true
                                            }
                                        })} />
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