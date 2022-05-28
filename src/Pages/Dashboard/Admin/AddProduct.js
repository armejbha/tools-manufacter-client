import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageStorageKey = '819484a66545be6ddf301161f97afe21'
    const onSubmit = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const productData = {
                        name: data.name,
                        description: data.description,
                        moq: data.minOrder,
                        stock: data.quantity,
                        price: data.price,
                        img: result.data.url
                    }
                    const url = 'https://pure-shore-37595.herokuapp.com/product';
                    fetch(url, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(productData)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success('Product Added')
                            navigate('/')
                        })
                }
            })
    }

    return (
        <div class="min-h-screen lg:mx-12">
            <div class="flex-col ">
                <h2 className="text-center text-3xl font-bold my-8">Add Product</h2>
                <form className='lg:mx-16 bg-base-100 p-12 rounded-md' onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full ">
                        {/* <label className="label">
                            <span className="label-text">Product Name</span>
                        </label> */}
                        <input type="text"
                            placeholder="Enter Your Product Name"
                            className="input input-bordered w-full"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Product is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className='text-red-500'>{errors.name.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        {/* <label className="label">
                            <span className="label-text">Product Description</span>
                        </label> */}
                        <input type="text"
                            placeholder="Enter Your Description"
                            className="input input-bordered w-full"
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.description?.type === 'required' && <span className='text-red-500'>{errors.description.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        {/* <label className="label">
                            <span className="label-text">Minimum Order</span>
                        </label> */}
                        <input type="number"
                            placeholder="Enter Your Min Order"
                            className="input input-bordered w-full"
                            {...register("minOrder", {
                                required: {
                                    value: true,
                                    message: 'Min Order is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.minOrder?.type === 'required' && <span className='text-red-500'>{errors.minOrder.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        {/* <label className="label">
                            <span className="label-text">Quantity</span>
                        </label> */}
                        <input type="number"
                            placeholder="Enter Your Quantity"
                            className="input input-bordered w-full"
                            {...register("quantity", {
                                required: {
                                    value: true,
                                    message: 'quantity is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.quantity?.type === 'required' && <span className='text-red-500'>{errors.quantity.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full ">
                        {/* <label className="label">
                            <span className="label-text">Price</span>
                        </label> */}
                        <input type="number"
                            placeholder="Enter Your Price"
                            className="input input-bordered w-full"
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: 'price is Required'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.price?.type === 'required' && <span className='text-red-500'>{errors.price.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full">
                        {/* <label className="label">
                            <span className="label-text">Image</span>
                        </label> */}
                        <div className='w-full border rounded-lg flex-col justify-center items-center p-8'>
                            <div className='lg:w-5/12 mx-auto'>
                                <p className='text-center text-xl font-bold'>Drag and Drop your Image anywhare or</p>
                                <input type="file"
                                    placeholder="Enter Your Image"
                                    className="input block mx-auto mt-2"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'Image is Required'
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        <label className="label">
                            {errors.image?.type === 'required' && <span className='text-red-500'>{errors.image.message}</span>}
                        </label>
                    </div>
                    <input className='btn btn-primary block m-auto w-full font-bold'
                        type="submit" value='Add Product' />
                </form>
            </div>
        </div>
        // <div className='my-4 flex justify-center'>
        //     <div className="card bg-base-100 shadow-xl">
        //         <div className="card-body items-center">

        //         </div>
        //     </div>
        // </div>
    );
};

export default AddProduct;