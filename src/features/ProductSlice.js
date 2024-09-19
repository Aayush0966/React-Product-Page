import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  productsData: [],
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, type }) => {
    // Determine the URL based on the type
    const url = type === 'search'
      ? `https://dummyjson.com/products/search?q=${category}`
      : `https://dummyjson.com/products/category/${category}`;
    
    // Fetch products from the appropriate URL
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return data.products;
  }
);


// Create the product slice
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productsData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const productReducer = productSlice.reducer;
