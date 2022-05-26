import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    }
    const menulist = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>
        <li>{user ? <Link onClick={logout} to='/login'>Logout</Link> : <Link to='/login'>Login</Link>}</li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact bg-base-100 dropdown-content shadow w-52">
                        {menulist}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl lg:text-3xl font-bold">Manufactering</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menulist}
                </ul>
            </div>
            <div className="navbar-end">
                <label for="mobile-drawer" class="btn btn-primary drawer-button lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;