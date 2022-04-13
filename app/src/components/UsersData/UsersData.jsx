import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useInput } from '../../hooks/useInput';
import MyCircleButton from '../UI/myCircleButton/MyCircleButton';

const UsersData = ({ user, number, onChangePath }) => {
    const username = useInput(user.username, {isEmpty: true, minLength: 6});
    const numberphone = useInput(user.numberphone, {isEmpty: true, minLength: 6});
    const description = useInput(user.description, {isEmpty: false, minLength: 0});
    const [role, setRole] = useState(user.role);
    const [roleValid, setRoleValid] = useState(false);
    const [role_id, setRoleId] = useState(user.role_id);
    
    const { users, isCurrentUser } = useSelector(state => state.users);
    const { setCurrentUser } = useActions();
    const [actions, setActions] = useState(isCurrentUser);

    const { roles } = useSelector(state => state.roles);
    const [isCurrentRole, setCurrentRole] = useState(roles.find(role => role.id == user.role_id));
    const [isAction, setIsAction] = useState(false);
    const { removeUser, createUser, updateUser } = useActions();

    useEffect (() => {
        setRole(user.role);
        setRoleId(user.role_id);
    }, [user])

    const getRole = (e, role) => {
        if (e.target.innerHTML == 'Выбрать роль ') {
            setRoleValid(false);
        } else {
            setRoleValid(true);
        }
        setCurrentRole(role);
        setRole(role.name);
        setRoleId(role.id);
    }

    const addData = () => {
        if (username.value) {
            let data = {
                username: username.value,
                numberphone: numberphone.value,
                description: description.value,
                role: role,
                role_id: role_id
            }
            createUser(users, data);
            setIsAction(false);
            setActions(null);
            setCurrentUser(null);
        } else {
            setIsAction(true);
        }
    }


    return (
        <tr>
            <td>
                <input className="form-control input" type='text' value={number} />
            </td>
            <td>
                <input style={( username.isDirty && username.isEmpty && username.minLengthError) ? { boxShadow: "0 0 0 0.25rem rgb(220 53 69 / 20%)", border: "1px solid #FF3D57" } : null} className="form-control input" type='text' value={username.value} onChange={e => username.onChange(e)} onBlur={e => username.onBlur(e)} />
            </td>
            <td>
                <input style={( numberphone.isDirty && numberphone.isEmpty && numberphone.minLengthError) ? { boxShadow: "0 0 0 0.25rem rgb(220 53 69 / 20%)", border: "1px solid #FF3D57" } : null} className="form-control input" type='text' value={numberphone.value} onChange={e => numberphone.onChange(e)} onBlur={e => numberphone.onBlur(e)}  />
            </td>
            <td>
                <input className="form-control input" type='text' value={description.value} onChange={e => description.onChange(e)} />
            </td>
            <td> 
               <div className='dropdown'>
                        {(actions == isCurrentUser && isCurrentUser)
                            ?  
                            <div class="btn-group" style={{width:'100px'}}>
                                <button
                                    className="btn list__btn"
                                    type="button">
                                    Выбрать роль 
                                </button>
                                <button type="button" class="btn list__btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="caret"/>
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>

                                <ul className='dropdown-menu' id='dropdown-menu' role="menu">
                                    {roles.map((role, key) => 
                                    <li><a className="dropdown-item " onClick={(e) => getRole(e, role)}>{role.name}</a></li>
                                    )}
                                </ul>
                            </div>
                            : 
                                <button                               
                                    className="btn list__btn"
                                    style={{width:"100px"}}
                                    type="button"
                                    onClick={() => onChangePath(isCurrentRole)}>
                                    {role}
                                </button>
                        }
                </div>
                   
            </td>
            <td>
                <div className="row">
                    {(actions == isCurrentUser && isCurrentUser) ?
                        <div className="col">
                            <MyCircleButton icon={"fa-trash"} onClick={() => removeUser(users, user.id)} />
                            <MyCircleButton disabled={!username.inputValid || !numberphone.inputValid} icon={"fa-check-square-o"} onClick={() => addData()} />
                        </div>
                        :
                        <div className="col">
                            <MyCircleButton icon={"fa-pencil"} onClick={() => updateUser(users, user.id, {...{}, username:username.value, numberphone:numberphone.value, description:description.value, role_id})} />
                            <MyCircleButton icon={"fa-trash"} onClick={() => removeUser(users, user.id)} />
                        </div>
                    }
                </div>
            </td>
        </tr >

    );
}



export default UsersData;