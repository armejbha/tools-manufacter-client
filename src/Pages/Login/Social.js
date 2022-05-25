import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
const Social = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    let errorMessage;
    if (loading) {
        return <Loading></Loading>
    }
    if (error) {
        errorMessage = <p className='text-red-500'>{error.message}</p>
    }
    if (user) {
        navigate('/home');
    }
    return (
        <div>
            <div class="divider">OR</div>
            {errorMessage}
            <button
                onClick={() => signInWithGoogle()}
                class="btn btn-outline block mx-auto w-full"
            >Continue With Google</button>
        </div>
    );
};

export default Social;