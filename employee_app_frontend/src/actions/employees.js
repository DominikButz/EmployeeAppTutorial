import axios from 'axios';
import { GET_EMPS, ADD_EMP, DEL_EMP, UPDATE_EMP } from "./types";
import { createMessage, returnErrors } from './messages';

export const getEmployees = () => async (dispatch, getState) => {
    try {

        const res = await axios.get(process.env.REACT_APP_API+'employee')
        console.log(res.data)
        dispatch({
            type: GET_EMPS,
            payload: res.data
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }
}

export const addEmployee = (body) => async (dispatch, getState) => {
    try {

        const res = await axios.post(process.env.REACT_APP_API + 'employee', body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        dispatch(createMessage({ addDep: 'Employee Added' }));
        dispatch({
            type: ADD_EMP,
            payload: res.data
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}

export const updateEmployee = (body) => async (dispatch, getState) => {
    try {

        const res = await axios.put(process.env.REACT_APP_API + 'employee', body, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(createMessage({ updateDep: 'Employee Updated' }));
        dispatch({
            type: UPDATE_EMP,
            payload: res.data
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}

export const deleteEmployee = (id) => async (dispatch, getState) => {
    try {

        await axios.delete(process.env.REACT_APP_API + 'employee/' + id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(createMessage({deleteDep: 'Employee Deleted' }));
        dispatch({
            type: DEL_EMP,
            payload: id
        })
    } catch(error) {
        console.log(error)
        dispatch(returnErrors(error.response.data, error.response.status))
    }

}