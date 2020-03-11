import {combineReducers} from "redux";
import List from "./list";
import Details from "./details";
import User from "./user";

const index=combineReducers({
    List,
    Details,
    User
})

export default index;