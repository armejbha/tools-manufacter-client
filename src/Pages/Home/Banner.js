import React from 'react';

const Banner = () => {
    return (
        <div className="hero min-h-screen bg-banner">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-4xl font-bold">Tools Manufacter, is the world larget tools manufactering company.</h1>
                    <p className="mb-5 text-md">This is world larget tools manufacter company.It's grow business justify market,quality assured and customer satisfaction.</p>
                    <button className="btn btn-primary">GET STARTED</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;