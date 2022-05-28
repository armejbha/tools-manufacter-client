import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../Shared/Loading/Loading';

const ManageProduct = () => {
    const navigate = useNavigate()
    const { data: products, isLoading, refetch } = useQuery('products', () =>
        fetch('https://pure-shore-37595.herokuapp.com/products')
            .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = id => {
        const url = `https://pure-shore-37595.herokuapp.com/products/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Delete Product')
                refetch()
            })
    }
    const editProduct = id => {
        navigate(`/editProduct/${id}`);
    }
    return (
        <div className='lg:mx-12'>
            <h1 className='text-3xl text-center font-bold my-8'>Manage All Products</h1>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Min Order</th>
                            <th>Price</th>
                            <th>Remove</th>
                            <th>Quantity Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, index) =>
                                <tr key={product._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.moq}</td>
                                    <td>${product.price}/piece</td>
                                    <td><button onClick={() => editProduct(product._id)} className='btn btn-sm'>Edit</button></td>
                                    <td>
                                        <label for="delete-product" className="btn btn-sm bg-red-400 border-0 modal-button">
                                            Delete
                                        </label>
                                        <input type="checkbox" id="delete-product" className="modal-toggle" />
                                        <div className="modal modal-middle ">
                                            <div className="modal-box">
                                                <h3 className="font-bold text-lg">Do You Want To Delete this product</h3>
                                                <div className="modal-action">
                                                    <label onClick={() => handleDelete(product._id)} for="delete-product" className="btn">Yes</label>
                                                    <label for="delete-product" className="btn">No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;