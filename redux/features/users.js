import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUser(state, action) {
            state.push(action.payload);
        },
        removeUser(state, action) {
            return state.filter(user => user !== action.payload);
        },
        toggleComplete(state, action) {
            const index = state.findIndex(user => user === action.payload);
            if (index !== -1) {
                state[index].completed = !state[index].completed;
            }
        },
    },
});

export const { addUser, removeUser, toggleComplete } = usersSlice.actions;

export default usersSlice.reducer;
