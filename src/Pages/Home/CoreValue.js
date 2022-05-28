import React from 'react';
import operrating from '../../image/icon/operrating.svg';
import factory from '../../image/icon/factory.svg';
import packaging from '../../image/icon/package.svg'
import delivery from '../../image/icon/dealer.svg'
const CoreValue = () => {
    return (
        <div className="card">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl font-bold">Tools Manufacter company core Values</h2>
                <p>We can produve more than 300000pcs of tools per month，We can produce more vaireties of carpentry tools, masonry tools, electric tools.</p>
                <div className="w-full my-4 grid lg:grid-cols-4 gap-5">
                    <div>
                        <div className="avatar">
                            <div className="w-16 rounded-xl">
                                <img src={factory} alt='' />
                            </div>
                        </div>
                        <p className='font-bold'>Experienced Factory</p>
                    </div>
                    <div>
                        <div className="avatar">
                            <div className="w-16 rounded-xl">
                                <img src={delivery} alt='' />
                            </div>
                        </div>
                        <p className='font-bold'>Fast Delivery</p>
                    </div>
                    <div>
                        <div className="avatar">
                            <div className="w-16 rounded-xl">
                                <img src={packaging} alt='' />
                            </div>
                        </div>
                        <p className='font-bold'>Professional Design</p>
                    </div>
                    <div>
                        <div className="avatar">
                            <div className="w-16 rounded-xl">
                                <img src={operrating} alt='' />
                            </div>
                        </div>
                        <p className='font-bold'>Standardized Operating</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreValue;