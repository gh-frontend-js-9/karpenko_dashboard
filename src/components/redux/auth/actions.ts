export const LOGIN:string = 'LOGIN';
export const LOGOUT:string = 'LOGOUT';

// set _id of user to localStorage
export const Login = (id:string) => {
    return {
        type: LOGIN,
        payload: id,
        setIdToLocalStorage: () => {
            localStorage.setItem("user_id", id);
        }
    }
};

// Clear localStorage
export const Logout = () => {
    return {
        type: LOGOUT,
        clearLocalStorage: () => {
            localStorage.clear();
        }
    }
}