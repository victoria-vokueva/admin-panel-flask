import {AppDispatch} from "../../index";
import UsersService from "../../../API/UsersService";
import axios from "axios";
import history from "../../../history";

export const RolesAction = {
    SET_ROLES: "SET_ROLES",
    SET_PATH: "SET_PATH",
    SET_CURRENT_ROLE: "SET_CURRENT_ROLE",
}

export const RolesActionCreators = {
    setRoles: (roles) => ({type: "SET_ROLES", payload: roles}),
    fetchRoles: () => async (dispatch) => {  
        try {
            const response = await UsersService.loadRoles()           
            if (response) {
                dispatch(RolesActionCreators.fetchPath(response));  
                dispatch(RolesActionCreators.setRoles(response));                            
            }
        }catch(e) {
            console.log(e);
        }
    },
    setPath: (path) => ({type: "SET_PATH", payload: path}),
    fetchPath: (roles) => async (dispatch) => {
        try {
            dispatch(RolesActionCreators.setPath(roles));      
            console.log(roles)         
            let urls = '';   
            if (roles.length) {
                urls = roles.map((item) => item.id).join('/');
            }
            history.push(`/${urls}`);
        } catch(e) {
            console.log(e);
        }
    },

}