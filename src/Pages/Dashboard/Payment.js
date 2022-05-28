import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L4OLHBodOfe8d2gUBgvYOR01HBVXCDnSB3cqDFhe4bS33i9idnlTfKAC1tOl2sZQ1WpwU6vWwc8eNopwZeHcZNo00zDPPrHEw');
const Payment = () => {
    const { id } = useParams()
    const url = `https://pure-shore-37595.herokuapp.com/order/${id}`;
    const { data: paymentData, isLoading } = useQuery(['payment', id], () =>
        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='flex-col justify-center items-center lg:w-1/2 mx-auto mt-12'>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <small className="">Hello,{paymentData.name}</small>
                    <h2 className='card-title'>Please pay for {paymentData.product}</h2>
                    <p>Email:{paymentData.email}</p>
                    <p>Product: {paymentData.product}</p>
                    <p>Address: {paymentData.address}</p>
                    <p>Number: {paymentData.number}</p>
                    <p>Quantity: {paymentData.orderQuantity}</p>
                    <p>Total Cost: {paymentData.totalPrice}</p>
                </div>
            </div>
            <div className="card bg-base-100 shadow-xl mt-4 p-8">
                <Elements stripe={stripePromise}>
                    <CheckoutForm paymentData={paymentData} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;