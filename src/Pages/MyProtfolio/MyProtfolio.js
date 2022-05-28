import React from 'react';
import myPic from '../../image/person/me.png'
const MyProtfolio = () => {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row">
                <div className="avatar w-1/4">
                    <div className="w-42 rounded-xl">
                        <img src={myPic} className="max-w-sm rounded-lg shadow-2xl" alt='' />
                    </div>
                </div>

                <div className='p-8 w-3/4'>
                    <h1 className="text-3xl lg:text-5xl font-bold">Abdur Rahim</h1>
                    <p className="py-2">Email: abdurrahim181878@gmail</p>
                    <p className="py-2">Education: Honours second year, Govt Titumir College</p>
                    <p className="py-2">Skill: React.js, Node.js, Javascript, Express.js, HTML5, CSS3,Bootstrap,Tailwind</p>
                    <h1 className="text-3xl lg:text-3xl font-bold">My Project</h1>
                    <p className="py-2">Laptop Warehouse : <a href="https://warehouse-6cfa1.web.app/">Live Site</a></p>
                    <p className="py-2">Financial consaltant: <a href="https://independent-service-prov-237f3.web.app/">Live Site</a></p>
                    <p className="py-2">Car Reviewer: <a href="https://fascinating-semifreddo-cac866.netlify.app/">Live Site</a></p>

                </div>
            </div>
        </div>
    );
};

export default MyProtfolio;