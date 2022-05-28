import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const MyOrder = () => {
    const [user] = useAuthState(auth)
    const { data: myOrders, isLoading, refetch } = useQuery('myOrder', () =>
        fetch(`https://pure-shore-37595.herokuapp.com/myOrder?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = id => {
        const url = `https://pure-shore-37595.herokuapp.com/order/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Delete Product from My Order');
                refetch()
            })
    }

    return (
        <div className='lg:mx-12'>
            <h1 className='text-3xl text-center font-bold my-8'>My Order</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra  w-full">
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Image and Other</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Remove</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders.map((order, index) =>
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
                                                </div >
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        {
                                            order.paid && <span className='btn btn-sm btn-primary text-white'>Paid</span>
                                        }
                                        {
                                            !order.paid && <Link to={`/dashboard/payment/${order._id}`} className='btn btn-sm'>Pay Now</Link>
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

export default MyOrder;