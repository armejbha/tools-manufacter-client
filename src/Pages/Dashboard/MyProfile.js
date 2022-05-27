import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import EditImage from './EditImage';
import EditProfile from './EditProfile';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const url = `http://localhost:5000/profile?email=${user?.email}`;
    const { data: profile, isLoading } = useQuery('profile', () =>
        fetch(url)
            .then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-3xl my-8 font-bold text-center'>My Profile</h1>
            <div className="my-16">
                <div className="w-full flex-col">
                    <div className="avatar block mx-auto w-4/12 lg:w-2/12">
                        <div className="w-32 mx-auto rounded-xl">
                            <img img={profile?.img} alt='profile photos' />
                        </div>
                        <div className='max-h-32 w-32 mx-auto'>
                            <EditImage></EditImage>
                        </div>
                    </div>
                    <div className="w-full">
                        <div class="card-body grid lg:grid-cols-3">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">name</span>
                                </label>
                                <input type="text" disabled value={profile?.name || user.displayName} class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="text" disabled value={user?.email} class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Location</span>
                                </label>
                                <input type="text" disabled value={profile?.location || ''} class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Education</span>
                                </label>
                                <input type="text" disabled value={profile?.education || ''} class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Linkedin Profile</span>
                                </label>
                                <input type="text" disabled value={profile?.linkedin || ''} class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Number</span>
                                </label>
                                <input type="text" disabled value={profile?.number || ''} class="input input-bordered" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <EditProfile></EditProfile>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;