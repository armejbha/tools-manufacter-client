import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../../../Shared/Loading/Loading';

const MakeAdmin = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () =>
        fetch(`https://pure-shore-37595.herokuapp.com/user`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    const handleAdmin = email => {
        const url = `https://pure-shore-37595.herokuapp.com/user/admin/${email}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    return toast.error('You do not have permission to make an admin')
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('Successfully Make an Admin')
                }
            })
    }
    return (
        <div className='max-h-screen lg:mx-12'>
            <h1 className='text-3xl text-center font-bold my-8'>Make Admin</h1>
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>email</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.role || 'user'}</td>
                                    <td>
                                        {
                                            user.role !== 'admin' ?
                                                <div>
                                                    <label for="admin" class="btn btn-sm modal-button">
                                                        Make Admin
                                                    </label>
                                                    <input type="checkbox" id="admin" class="modal-toggle" />
                                                    <div class="modal modal-middle">
                                                        <div class="modal-box">
                                                            <h3 class="font-bold text-lg">Do you make this user admin</h3>
                                                            <div class="modal-action">
                                                                <label onClick={() => handleAdmin(user.email)} for="admin" class="btn">Yes</label>
                                                                <label for="admin" class="btn">No</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                : <button className='btn btn-sm m-1 bg-primary border-0 text-white'>Already Admin</button>
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

export default MakeAdmin;
