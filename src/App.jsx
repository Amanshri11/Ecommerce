import React, { useState } from "react"
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import ProductDetails from "./ProductDetails";
import ProductListPage from "./ProductListPage";

// {
// THIS IS FOR CART
// 2:4,
// 7:5,
// 1:3,

// } 
function App() {

  const  savedDataStr = localStorage.getItem("my-cart") || "{}"; // STORING LOCALLY SO THAT CART DOESN'T GET LOST WHEN APP GETS UNMOUNTED
  const savedData = JSON.parse(savedDataStr);

  const [cart,setCart] = useState(savedData);
  console.log("cart is : ", cart);

  function handleAddtocart(productId, count){

 console.log("product id is : ", productId , " , count is : ",count);

 const oldCount = +cart[productId] || 0;

 const newCart = {...cart, [productId]:(oldCount+ (+count))};

 const cartString = JSON.stringify(newCart);
 
 localStorage.setItem("my-cart", cartString);

 
 setCart(newCart);


  }

// HOW DOES REDUCE FUNCTIONM WORKS

// const v =[1,2,3,4];

// const sumOfArr = v.reduce(functon(output,current){
 
//     return (output+current);

// },0);

const Totalcount = Object.keys(cart).reduce(function(totalCount,current){
  return (totalCount)+(+cart[current]);
     },0)


  return (
<>
<div className="w-full bg-white py-1">
      <div className=" flex pl-10 justify-center w-1/2">
<Navbar  photo="https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png"></Navbar>  
      </div>
    </div>
    <div>Total Products Added to cart - {Totalcount}</div>
<div className="flex justify-center  py-20 ">
<div className=" bg-white ">

<Routes>

<Route index element={<ProductListPage/>}></Route>

<Route path="/products/:id" element={<ProductDetails   onAddToCart = {handleAddtocart}/>}></Route>

</Routes>

  </div>
</div>

</>

    )
}

export default App
