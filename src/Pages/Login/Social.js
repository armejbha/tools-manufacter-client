import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
const Social = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    let errorMessage;
    if (loading) {
        return <Loading></Loading>
    }
    if (error) {
        errorMessage = <p className='text-red-500'>{error.message}</p>
    }
    if (user) {
        navigate(from, { replace: true });
    }
    return (
        <div>
            <div className="divider">OR</div>
            {errorMessage}
            <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline block mx-auto w-full"
            >Continue With Google</button>
        </div>
    );
};

export default Social;