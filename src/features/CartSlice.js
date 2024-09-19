import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
    CartItems: []
};

// Create a slice for the cart
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Reducer to add an item to the cart
        addToCart: (state, action) => {
            const { id, name, img, amt, price, discount } = action.payload; // Destructure payload
            const newItem = {
                productId: id,
                productName: name,
                productImg: img,
                productAmount: amt,
                productPrice: price,
                productDiscount: discount
            };
            state.CartItems.push(newItem); // Add the new item to the cart
        },
        updateAmount: (state, action) => {
            const { id, newAmount } = action.payload; // Destructure payload
            state.CartItems = state.CartItems.map(cartItem =>
                cartItem.productId === id ? { ...cartItem, productAmount: newAmount } : cartItem
            );
        },
        deleteItem: (state, action) => {
            const { id } = action.payload; // Destructure payload
            state.CartItems = state.CartItems.filter(cartItem => cartItem.productId !== id);
        }
    }
});

// Export the action creator and reducer
export const { addToCart, updateAmount, deleteItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
