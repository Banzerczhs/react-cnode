function details(state={
    loading : true,
    data : {}
},action){
    switch(action.type){
        case "DETAIL_UPDATE":
            return {
                loading : action.loading,
                data : action.data
            }
        case "DETAIL_UPDATE_SUC":
            return {
                loading : action.loading,
                data : action.data
            }
        case "DETAIL_UPDATE_ERR":
            return {
                loading : action.loading,
                data : action.data
            }
        default:
            break;
    }

    return state;
}

export default details;