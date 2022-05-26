import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const MyOrder = () => {
    const [user] = useAuthState(auth)
    const url = `http://localhost:5000/myOrder?email=${user?.email}`;
    const {
        data: myOrders,
        isLoading,
        refetch
    } = useQuery('myOrder', () =>
        fetch(url)
            .then(res => res.json())
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleDelete = id => {
        const url = `http://localhost:5000/order/${id}`;
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
        <div>
            <h1 className='text-3xl text-center font-bold my-8'>My Order</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra  w-full">
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Payment</th>
                            <th>Remove</th>
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
                                    <td>Payment</td>
                                    <td>
                                        <label for="order-cancel" class="btn btn-sm modal-button">
                                            Order Cancel
                                        </label>
                                        <input type="checkbox" id="order-cancel" class="modal-toggle" />
                                        <div class="modal modal-bottom sm:modal-middle">
                                            <div class="modal-box">
                                                <h3 class="font-bold text-lg">Do You Want To Cancel This Order</h3>
                                                <div class="modal-action">
                                                    <label onClick={() => handleDelete(order._id)} for="order-cancel" class="btn">Yes</label>
                                                    <label for="order-cancel" class="btn">No</label>
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

export default MyOrder;