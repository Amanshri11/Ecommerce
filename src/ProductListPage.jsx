import React, { useEffect, useState } from "react"
import Product from "./Product";
import { getProductList } from "./Api";
import { DatafromAPI } from "./DatafromAPI";
import {ImSpinner9} from "react-icons/im"
function ProductListPage() {

const [sorte,setSorte] =useState("default");
const [query,setQuery] = useState("");

const [alldata,setAllData] = useState([]);

useEffect(function (){

  const ps = getProductList();

  ps.then(function(response){
    const d= response.data.products;
    setAllData(d);
    DatafromAPI.push(...d);


  });

},[]);

if(alldata.length <=0 ){
  return(
<><div className="text-3xl">
  <ImSpinner9 className="animate-spin"/>
</div>
</>
  );
}


let data = alldata.filter(function(x){
 
  const chk = x.title;
  const chkQ = query.toLowerCase();
  if(query !="")
   return chk.toLowerCase().indexOf(chkQ) != -1;
 else{
  return 1;
 }
  });

function handelSearchChange(event){

const newQuery = event.target.value;


setQuery(newQuery);

}



function handelSortChange(event){
  
const newSorte = event.target.value.toLowerCase();
alldata.sort(function(x,y){

  if(newSorte == "lthprice")
   return x.price - y.price;
  if(newSorte == "htlprice")
   return y.price - x.price;
  if(newSorte == "sname")
   return x.title.toLowerCase() > y.title.toLowerCase() ? 1 : -1; 

  else{
    return 0;
  } 
});
  console.log("sorte change called ", newSorte);
  setSorte(newSorte);
  setAllData(alldata);
}



  return (

<>

    <div className="flex pt-10 flex-col sm:flex-row justify-end max-w-36 gap-3 mr-1 ">
    <input placeholder="Search" className="border border-black rounded"  onChange={handelSearchChange} value={query}></input>
    <select className="border border-black rounded bg-gray-200 sm:text-xl xs:text-xs"  value={sorte} onChange={handelSortChange}>
    <option  value ="default">Default Sort</option>
    <option value = "lthprice">Sort by price - low to high</option>
    <option value = "htlprice">Sort by price - high to low</option>
    <option value = "sname">Sort by Name</option>
    </select>
    </div>
    
  {data.length > 0 &&<div className="md:grid grid-cols-3 justify-center item-center box-border m-2 mt-6">
    {
      data.map(function(item){
      return  <div> <Product {...item}></Product> </div>;
      })
    }

  </div>}
  {data.length <=0 && <div className="mt-6">Product OUT OFF Stock</div>}

</>

    )
}

export default ProductListPage
