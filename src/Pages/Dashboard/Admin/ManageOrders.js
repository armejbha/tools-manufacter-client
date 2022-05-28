import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../Shared/Loading/Loading';

const ManageOrders = () => {
    const { data: orders, isLoading, refetch } = useQuery('myOrder', () =>
        fetch('http://localhost:5000/order', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = id => {
        const url = `http://localhost:5000//order/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Delete Product')
                refetch()
            })
    }
    return (
        <div>
            <h1 className='text-3xl text-center font-bold my-8'>My Order</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra  w-full">
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Image and other</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Remove</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) =>
                                <tr key={order._id} className="text-center">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex justify-center items-center space-x-6">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16">
                                                    <img src={order.img} alt="order pictur" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{order.name}</div>
                                                <div className="text-sm opacity-50">{order.address}</div>
                                                <div className="text-sm opacity-50">{order.number}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{order.product}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        {
                                            !order.paid &&
                                            <div>
                                                <label for="order-cancel" class="btn btn-sm modal-button">
                                                    Delete
                                                </label>
                                                <input type="checkbox" id="order-cancel" class="modal-toggle" />
                                                <div class="modal modal-bottom sm:modal-middle">
                                                    <div class="modal-box">
                                                        <h3 class="font-bold text-lg">Do You Want To Delete</h3>
                                                        <div class="modal-action">
                                                            <label onClick={() => handleDelete(order._id)} for="order-cancel" class="btn">Yes</label>
                                                            <label for="order-cancel" class="btn">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        {
                                            order.paid && <span className='btn btn-sm btn-primary text-white'>Pending</span>
                                        }
                                        {
                                            !order.paid && <Link to={`/dashboard/payment/${order._id}`} className='btn btn-sm'>Unpaid</Link>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;
