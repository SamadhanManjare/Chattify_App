import { create } from 'zustand';

const useAuthStore = create((set) => ({
    authUser: {name : 'John Doe', _id : '12345',age: '25'},
    isLoggedIn : false,
    isLoading : false,

    login : () => {
        console.log("We just logged in....")
        set({isLoggedIn : true, isLoading : true});
    }
}));
export default useAuthStore;
