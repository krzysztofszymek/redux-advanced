import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    totalQuantity: 0,
    changed: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        replaceCart(state, action){
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if(!existingItem){
                state.items.push({
                    id: newItem.id, 
                    title: newItem.title,
                    price: newItem.price, 
                    quantity: 1, 
                    totalPrice: newItem.price
                });
            }
            else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
            state.changed = true;
            state.totalQuantity++;
        },
        removeFromCart(state, action){
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem.quantity === 1){
                state.items = state.items.filter((item) => item.id !== id);
            }
            else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
            state.changed = true;
            state.totalQuantity--;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;