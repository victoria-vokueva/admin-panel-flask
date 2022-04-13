import React from 'react';
import Breadcrums from '../components/Breadcrumbs/Breadcrumbs';
import history from "../history";
import MyButton from "../components/UI/myButton/MyButton"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useActions } from '../hooks/useActions';
import { useUsers } from '../hooks/useUsers';
import UsersList from '../components/UsersList';

function setCurrentPath(path, arr, roles) {
    let elem={}
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].id == path.role_id) {
            elem = roles[i]
        }
    }
    if (path.id) {
        arr.unshift(path);
        if (path.role_id != null) return setCurrentPath(elem, arr, roles);
    }
    return arr;
}

const Users = () => {
    const dispatch = useDispatch();
    const { roles, path } = useSelector(state => state.roles);
    const [filter, setFilter] = useState({sort:'', query: path});
    const { users, isCurrentUser } = useSelector(state => state.users);
    const sortedAndSearchUsers = useUsers(users, filter.sort, filter.query);
    const { fetchUsers, fetchRoles, setCurrentUser, setPath } = useActions();


    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, [])

    /*const [fetchUsers] = useFetching( async() => {
        let users = await UsersService.getUsersJoinRoles();
        setUsers(users);
      }, [])
      
      useEffect(() => {
        fetchUsers();
      }, [])*/

    const addRow = () => {
        const newUser = {
            description: '',
            id: null,
            numberphone: '',
            role_id: 1,
            role: '',
            username: ''
        };
        setCurrentUser(newUser);
    }

    function onChangePath(directory) {
        let newPath = setCurrentPath(directory, [], roles);
        let urls = '';
        if (newPath.length) {
            urls = newPath.map((item) => item.id).join('/');
        }
        history.push(`/${urls}`);
        setPath(newPath);
        setFilter({...filter, query: newPath})
    }

    return (
        <div>
            <Breadcrums path={path} onChangePath={onChangePath} />
            <MyButton icon="fa-plus" onClick={() => addRow()}>Добавить пользователя</MyButton>
            <UsersList
                users={isCurrentUser !== null ? [...sortedAndSearchUsers, isCurrentUser] : sortedAndSearchUsers}
                onChangePath={onChangePath} />
        </div>
    );

}

export default Users;