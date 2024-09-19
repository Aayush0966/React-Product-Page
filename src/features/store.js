import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductSlice";
import { cartReducer } from "./CartSlice";

export const store = configureStore( {
    reducer : {
     products: productReducer,
     carts: cartReducer
    }
    
   } )