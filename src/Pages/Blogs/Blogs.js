import React from 'react';

const Blogs = () => {
    return (
        <div>
            <div className='lg:w-1/2 mx-auto border border-blue-400 rounded-lg shadow-lg p-8 mt-4'>
                <h1 className='text-center text-3xl text-orange-600 mt-4'>How I can  improve the performance of a React Application</h1>
                <p className='mt-2'>In React Application there are lots of resources  to improve application performance. There are so many options like react form hook instants of any form , react query instant of data loading , react firebase hooks for easy authorization and authentication etc.
                </p>
            </div>
            <div className='lg:w-1/2 mx-auto border border-blue-400 rounded-lg shadow-lg p-8 mt-4'>
                <h1 className='text-center text-3xl text-orange-600 mt-4'>What are the different ways to manage a state in a React application</h1>
                <p className='mt-2'>There are so many ways to manage a state in a react application. One of the best ways to manage state in a react application is to use react query hooks. In react query hooks makes state management very easy.
                </p>
            </div>
            <div className='lg:w-1/2 mx-auto border border-blue-400 rounded-lg shadow-lg p-8 mt-4'>
                <h1 className='text-center text-3xl text-orange-600 mt-4'>How does prototypical inheritance work</h1>
                <p className='mt-2'>In JavaScript, an object can inherit properties of another object. The object from which the properties are inherited is named prototype. It is a feature in javascript. It is a method by which an object can inherit the properties and methods of another object.
                </p>
            </div>
            <div className='lg:w-1/2 mx-auto border border-blue-400 rounded-lg shadow-lg p-8 mt-4'>
                <h1 className='text-center text-3xl text-orange-600 mt-4'>Why you do not set the state directly in React</h1>
                <p className='mt-2'>When i set state that means next i update this so that i do not set the state directly in react. If it is set products = [...] I do not modify this state. It looks like a fixed value. If i want update the state i set  const [products, setProducts] = useState([]).
                </p>
            </div>
            <div className='lg:w-1/2 mx-auto border border-blue-400 rounded-lg shadow-lg p-8 mt-4'>
                <h1 className='text-center text-3xl text-orange-600 mt-4'>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name</h1>
                <p className='mt-2'>In an array of products if i want to implement a search to find products by name,  i use query parameter and i set query parameter as name.
                </p>
            </div>
        </div>
    );
};

export default Blogs;