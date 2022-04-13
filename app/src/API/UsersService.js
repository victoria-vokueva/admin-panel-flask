import axios from "axios";

export default class UsersService {

    static async loadUsers() {
        const response = await axios.get(`http://127.0.0.1:5000/users`);
        return response;
    }

    static async removeUser(id) {
        await fetch(`http://127.0.0.1:5000/users/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 200) {
                    return response;
                }
            })
    }

    static async createUser(data) {
        let response = await fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    static async updateUser(id, data) {
        let response = await fetch(`http://127.0.0.1:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return await response.json();     
    }

    static async loadRoles() {
        let roles = [];
        await fetch(`http://127.0.0.1:5000/roles`)
            .then(response => {
                const promise = response.json();
                promise.then(result => {
                    for (let i = 0; i < result.length; i++)
                        roles.push(result[i]);
                })
            })
        return roles;
    }

    static async getUsersJoinRoles() {
        const roles = await this.loadRoles();
        const responce = await this.loadUsers();
        const users = responce.data;
        let arr = []
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < roles.length; j++) {
                if (users[i].role_id === roles[j].id) {
                    arr.push({ ...users[i], role: roles[j].name })
                }
            }
        }
        return arr;
    }

}