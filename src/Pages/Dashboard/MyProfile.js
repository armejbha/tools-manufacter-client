import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { AiFillLinkedin } from '@heroicons/react/solid'
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import EditImage from './EditImage';
import EditProfile from './EditProfile';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const { data: profile, isLoading } = useQuery('profile', () =>
        fetch(`https://pure-shore-37595.herokuapp.com/profile?email=${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='lg:mx-12'>
            <h1 className='text-3xl my-8 font-bold text-center'>My Profile</h1>
            <div className='grid lg:grid-cols-2 gap-12'>
                <div className=" card lg:card-side bg-base-100 shadow-xl py-8">
                    <div className='w-full flex-col'>
                        <div class="avatar block mx-auto">
                            <div class="w-44 rounded-full mx-auto">
                                <img src={profile?.img} alt='profile photos' />
                            </div>
                            <div className='max-h-32 w-32 mx-auto'>
                                <EditImage></EditImage>
                            </div>
                        </div>
                        <div className='lg:w-1/2 w-11/12 mx-auto'>
                            <div className='flex items-center mt-4'>
                                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                                <p className='ml-2'>Email:{user?.email}</p>
                            </div>
                            <div className='flex  items-center  mt-4'>
                                <FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon>
                                <p className='ml-2'>Education:{profile?.education}</p>
                            </div>
                            <div className='flex  items-center  mt-4'>
                                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                                <p className='ml-2'>Location:{profile?.location}</p>
                            </div>
                            <div className='flex items-center  mt-4'>
                                <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                                <p className='ml-2'>Mobile Number:{profile?.number}</p>
                            </div>
                            <div className='flex items-center  mt-4'>
                                <svg className='w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                                <p className='ml-2'>Linkedin Account:{profile?.linkedin || ''}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <EditProfile></EditProfile>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;