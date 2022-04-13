import { RolesActionCreators } from "./roles/action-creators";
import { UsersActionCreators } from "./users/action-creators";

export const allActionCreators = {
    ...RolesActionCreators,
    ...UsersActionCreators,
}