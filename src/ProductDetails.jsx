import React, { useDeferredValue, useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { getProductData } from "./Api";
import {ImSpinner9} from "react-icons/im";
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";





function ProductDetails({onAddToCart}){

const params = useParams();
const ide = +(params.id);


    console.log("ID is ", ide);
// const [product ,setproduct] = useState();
const [count,setCount]  = useState(1);
const [loading2, setLoading2] = useState(true);
const [product, setproduct]  = useState();
useEffect(function(){
    setCount(1);
    const chk = getProductData(ide);
    chk.then(function(response){
     console.log("response Pd is ",response);
      setproduct(response.data);
      setLoading2(false);
    }).catch(function(){
        setLoading2(false);
    });


    // AUR UPAR BALA .CATCH SE HATAKE, AISE BHI LIKH SAKTE
    // chk.catch(function(){
    //     setLoading2(false);
    // })

},[ide]);

// for(let i=0;i<DatafromAPI.length ;i++){
//     const p = DatafromAPI[i];
//     if(ide == p.id){
// product = p;
//     }
// }





function handleChangeCount(event){
    setCount(event.target.value);
}

function handleAddedToCart(){
    onAddToCart(ide,count);
}

if(!product){

    if(loading2 ){
        return <div className="text-3xl bg-gray-200">
            <ImSpinner9 className="animate-spin"/>
        </div>
    }
    

    return (<>
    <div className="text-3xl">Product Not Found</div>
    </>);
}
    return (

 <>

<div className="text-gray-200 text-3xl bg-black ">{product.title}</div>
<input type = "number" value={count} className="" onChange={handleChangeCount}/>
<button className="text-3xl bg-black text-gray-200 mt-2 rounded-md px-4 py-2" onClick={handleAddedToCart}>Add to Cart</button>

<div className="flex justify-between">
{ide>1 && <Link to={"/products/"+(ide-1)}><GrLinkPrevious/>Previous</Link>}
<span className="grow"></span>
<Link to={"/products/"+(ide+1)}><GrLinkNext/>Next</Link>
</div>
</>


    );
}

export default ProductDetails