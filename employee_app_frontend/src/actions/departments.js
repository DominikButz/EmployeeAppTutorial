import axios from 'axios';
import { GET_DEPS, ADD_DEP, DEL_DEP, UPDATE_DEP } from "./types";
import { createMessage, returnErrors } from './messages';

export const getDeps = () => async (dispatch, getState) => {
    try {

        const res = await axios.get(process.env.REACT_APP_API+'department')
        // const response =  await fetch(process.env.REACT_APP_API+'department')
        // const data = await response.json()
        console.log(res.data)
        dispatch({
            type: GET_DEPS,
            payload: res.data
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }
}

export const addDep = (body) => async (dispatch, getState) => {
    try {

        const res = await axios.post(process.env.REACT_APP_API + 'department', body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        // const response = await fetch(process.env.REACT_APP_API + 'department', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }, 
        //     body: JSON.stringify(body)
        // })
        // const data = await response.json()
        dispatch(createMessage({ addDep: 'Department Added' }));
        dispatch({
            type: ADD_DEP,
            payload: res.data
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}

export const updateDep = (body) => async (dispatch, getState) => {
    try {

        const res = await axios.put(process.env.REACT_APP_API + 'department', body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        dispatch(createMessage({ updateDep: 'Department Updated' }));
        dispatch({
            type: UPDATE_DEP,
            payload: res.data
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}

export const deleteDep = (id) => async (dispatch, getState) => {
    try {

        await axios.delete(process.env.REACT_APP_API + 'department/' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        // const response = await fetch(process.env.REACT_APP_API + 'department/' + id, {
        //     method: 'DELETE',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
        // const data = await response.json()
        dispatch(createMessage({deleteDep: 'Department Deleted' }));
        dispatch({
            type: DEL_DEP,
            payload: id
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}



