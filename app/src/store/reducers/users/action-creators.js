import UsersService from "../../../API/UsersService";

export const UsersAction = {
    SET_USERS: "SET_USERS",
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

export const UsersActionCreators = {
    setUsers: (users) => ({ type: "SET_USERS", payload: users }),
    setCurrentUser: (user) => ({ type: "SET_CURRENT_USER", payload: user }),
    fetchUsers: () => async (dispatch) => {
        try {
            const response = await UsersService.getUsersJoinRoles()
            console.log(response)
            if (true) {
                dispatch(UsersActionCreators.setUsers(response));
            }
        } catch (e) {
            console.log(e)
        }
    },
    removeUser: (users, id) => async (dispatch) => {
        try {          
            const newList = users.filter(user => user.id !== id);
            dispatch(UsersActionCreators.setUsers(newList));
            const response = await UsersService.removeUser(id); 
        } catch (e) {
            console.log(e)
        }
    },
    createUser: (users, data) => async (dispatch) => {
        try {
            const obj = {...data};
            delete obj.role;
            await UsersService.createUser(obj);
            users.push(data);
            dispatch(UsersActionCreators.setUsers(users));
        } catch (e) {
            console.log(e)
        }
    },  
    updateUser: (users, id, data) => async (dispatch) => {
        try {
            /*const obj = {...data};
            delete obj.role;*/
            console.log(data)
            await UsersService.updateUser(id, data);
            const delItem = users.find(user => user.id == data.id);
            delete users[delItem.id]
            users.push(data);
            dispatch(UsersActionCreators.setUsers(users));
        } catch (e) {
            console.log(e)
        }
    }
}