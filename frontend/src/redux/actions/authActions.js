import axios from 'axios'

const authActions = {
    addNewUser: (user) => {
        return (dispatch, getState) =>  {
            axios.post('http://localhost:4000/api/user/singup', {...user})
                .then(res => {
                    if(res.data) {
                        dispatch({type: 'AUTH_USER', payload: res.data})
                    }
                })
                .catch(error => console.log(error))
        }
    },
    loginUser: (loginUser) => {
        return (dispatch, getState) => {
            axios.post('http://localhost:4000/api/user/singin', {...loginUser})
                .then(res => {
                    dispatch({type: 'AUTH_USER', payload: res.data})
                })
                .catch(error => console.log(error))
        }
    },
    loginLocalStorage: (token) => {
        return (dispatch, getState) => {
            axios.get('http://localhost:4000/api/verifytoken', {
                headers: { Authorization: 'Bearer ' + token }
            })
                .then( res => dispatch({type: 'AUTH_USER_LS', payload: res.data}) )
                .catch( error =>  dispatch( {type: 'SIGN_OUT', payload: error }) )
        }
    },
    signOut: () => {
        return (dispatch, getState) => {
            dispatch({type: 'SIGN_OUT', payload: null})
        }
    }
}

export default authActions