import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../apis/calendarApi";
import { checking, cleanErrorMessage, onLoging, onLogout } from "../store";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(checking());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.toquen)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoging({ name: data.name, uid: data.uid }));


        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                dispatch(cleanErrorMessage());
            }, 10);

        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(checking());

        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.toquen)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoging({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '----'));

            setTimeout(() => {
                dispatch(cleanErrorMessage())
            }, 10);

        }
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            const {data} = await calendarApi.get('auth/renew');
            console.log(data);
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLoging({ name: data.name, uid: data.uid }));           
            
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = ()=> {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {

        // * propiedades
        status,
        user,
        errorMessage,

        // * metodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout,
    }
}
