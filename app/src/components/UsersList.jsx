import React from 'react';
import UsersData from './UsersData/UsersData';


const UsersList = ({ users, onChangePath }) => {

    if (!users.length) {
        return (
            <h2 style={{ textAlign: 'center' }}>
                Пользователи не найдены!
            </h2>
        )
    }

    return (
        <div className="col-md-12">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>ФИО</th>
                        <th>Номер телефона</th>
                        <th>Описание</th>
                        <th>Роль</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <UsersData user={user} number={key+1} onChangePath={onChangePath} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;