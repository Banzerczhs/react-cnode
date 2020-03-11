function user(state={
    loading : true,
    data : []
},action){
    switch(action.type){
        case "USER_UPDATE":
            return {
                loading : action.loading,
                data : action.data
            }
        case "USER_UPDATE_SUC":
            return {
                loading : action.loading,
                data : action.data
            }
        case "USER_UPDATE_ERR":
            return {
                loading : action.loading,
                data : action.data
            }
        default:
            break;
    }

    return state;
}

export default user;