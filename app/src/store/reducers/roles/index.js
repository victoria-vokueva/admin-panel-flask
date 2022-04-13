import { RolesAction } from "./action-creators";
import axios from "axios";

const initialState = {
    roles: [],
    path: [],
}

export default function rolesReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ROLES":
            return {...state, roles: action.payload};
        case "SET_PATH":
            return {...state, path: action.payload};
        default:
            return state;
    }
}