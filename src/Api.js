import React from "react";
import axios from "axios";

export function getProductData(id){
    const tkn = axios.get("https://dummyjson.com/products/"+id );
    return tkn;
}

export function getProductList(){

    const tkn =  axios.get("https://dummyjson.com/products");
    return tkn;
    
}