import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
            <input id="mobile-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="mobile-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content">
                    <li><Link to='/dashboard'>My Profile</Link></li>
                    <li><Link to='/dashboard/manageOrder'>Manage Order</Link></li>
                    <li><Link to='/dashboard/addProduct'>Add Product</Link></li>
                    <li><Link to='/dashboard/manageProduct'>Manage Product</Link></li>
                    <li><Link to='/dashboard/myOrder'>My Order</Link></li>
                    <li><Link to='/dashboard/addReview'>Add Review</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;