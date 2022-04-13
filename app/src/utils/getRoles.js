export const getRoleOnId = (roles, id) => {
    for (let i in roles) {
        if (roles[i].id == id) {
            return roles[i];
        }
    }
    return null;
}
