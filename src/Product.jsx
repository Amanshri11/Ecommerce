import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

function Product(data){

return (

<div className=" max-w-xs m-2 mb-4 bg-gree flex flex-col space-between h-full" >
<img src={data.thumbnail} />
  <div className="font-bold ">{data.title}</div>
<div className='mb-2 flex-grow-0'>Price : {data.price}</div>
{/* <span className='grow'></span> */}


<div className='flex items-center flex-col mb-5'>
<Link  className='bg-gray-700 rounded grow-0  text-white px-2 py-1 ' to= {"/products/"+data.id} >View Details</Link>
  </div>
  </div>
);
  
}



export default Product;