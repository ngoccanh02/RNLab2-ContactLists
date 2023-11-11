import { createSlice, configureStore } from '@reduxjs/toolkit'; 

const contactsSlice = createSlice({
    name: 'contacts', // Sửa tên của slice thành 'contacts'
    initialState: {
        contacts: [], 
        loading: false, 
        error: false,
    },
    reducers: {
        fetchContactsLoading: (state, action) => {
            state.loading = true; // Đặt loading thành true khi bắt đầu tải dữ liệu
        },
        fetchContactsSuccess: (state, action) => {
            state.contacts = action.payload;
            state.loading = false; // Đặt loading thành false sau khi tải xong
            state.error = false;   // Đặt error thành false sau khi tải xong
        },
        fetchContactsError: (state, action) => {
            state.loading = false;
            state.error = true;  
        },
    }
});

export const {
    fetchContactsLoading,
    fetchContactsSuccess,
    fetchContactsError,
} = contactsSlice.actions;

const store = configureStore({ reducer: contactsSlice.reducer }); // Sửa thành store, không sử dụng biến global

export default store;
