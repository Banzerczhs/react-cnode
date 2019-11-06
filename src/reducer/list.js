function list(state={
    loading : true,
    data : []
},action){
    switch (action.type) {
        case "LIST_UPDATE":
            return {
                loading : action.loading,
                data : state.data
            }
        case "LIST_UPDATE_SUC":
            return {
                loading : action.loading,
                data : action.data
            }
        case "LIST_UPDATE_ERR":
            return {
                data : action.data
            }
        default:
            break;
    }
    return state;
}

export default list;