import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const EditProfile = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const url = `https://pure-shore-37595.herokuapp.com/profile?email=${user.email}`
    const { data: profile, refetch } = useQuery('profile', () =>
        fetch(url)
            .then(res => res.json()))
    const onSubmit = data => {
        const profileData = {
            name: data.name,
            location: data.location,
            education: data.education,
            linkedin: data.linkedin,
            number: data.number
        }
        const url = `https://pure-shore-37595.herokuapp.com/profile/${user.email}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(profileData)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Update successfully');
                navigate('/dashboard')
                return refetch()
            })
    };
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            defaultValue={profile?.name}
                            placeholder="Enter Your Name"
                            className="input input-bordered w-full"
                            {...register("name")}
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input type="text"
                            defaultValue={profile?.location}
                            placeholder="Enter Your Location"
                            className="input input-bordered w-full"
                            {...register("location")}
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Education</span>
                        </label>
                        <input type="text"
                            defaultValue={profile?.education}
                            placeholder="Enter Your Education"
                            className="input input-bordered w-full"
                            {...register("education")}
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Linkedin Profile</span>
                        </label>
                        <input type="text"
                            defaultValue={profile?.linkedin}
                            placeholder="Enter Your Linkedin Profile"
                            className="input input-bordered w-full"
                            {...register("linkedin")}
                        />
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Number</span>
                        </label>
                        <input type="number"
                            defaultValue={profile?.number}
                            placeholder="Enter Your Number"
                            className="input input-bordered w-full"
                            {...register("number")}
                        />
                    </div>
                    <input className='btn btn-primary my-4 block m-auto w-full font-bold' type="submit" value='Update' />
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
