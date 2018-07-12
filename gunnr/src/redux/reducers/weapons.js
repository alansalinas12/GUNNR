const initialState = {
    weapons: [],
    weapon: {}
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_WEAPONS':
            return {
                ...state,
                weapons: action.weapons
            }
        case 'VIEW_WEAPON':
            return {
                ...state,
                weapon: action.weapon
            }
        case 'CLAP_WEAPON':
            let weapon = Object.assign({}, state.weapon)
            weapon.claps++
            console.log(weapon)
            return {
                ...state,
                weapon: weapon
            }
        default:
            return state
    }
}