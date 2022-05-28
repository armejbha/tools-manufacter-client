import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const NotFound = () => {
    return (
        <div className='w-8/12 md:w-2/12 mx-auto my-32 border border-gray-200 p-4 bg-white shadow-lg rounded-lg'>
            <div className='text-center'>
                <FontAwesomeIcon className='text-6xl' icon={faCircleExclamation}></FontAwesomeIcon>
            </div>
            <div>
                <h1 className='text-center text-3xl mt-4'>404</h1>
                <p className='text-center text-3xl'>Page Not Found</p>
            </div>
        </div>
    );
};

export default NotFound;