const userLoggedReducer = (state = false, action) => {
    switch(action.type){
        case '[User] SIGNED_IN':
            return !state;
        default:
            return state;
    }
}

export default userLoggedReducer;