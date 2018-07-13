import axios from 'axios'

//const url = "http://localhost:5000/api/"
const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export function loadWeapons() {
    return (dispatch) => {
        axios.get(`${url}weapons`)
            .then((res) => {
                let weapons = res.data
                dispatch({ type: 'LOAD_WEAPONS', weapons })
            }).catch((err) => {
                console.log(err)
            })
    }
}
export function getUser(_id) {
    return axios.get(`${url}user/${_id}`).then((res) => {
        return res.data
    }).catch(err => console.log(err))
}

export function getUserProfile(_id) {
    return (dispatch) => {
        axios.get(`${url}user/profile/${_id}`).then((res) => {
            let profile = res.data
            dispatch({ type: 'SET_PROFILE', profile })
        }).catch(err => console.log(err))
    }
}

export function getWeapon(weapon_id) {
    return (dispatch) => {
        axios.get(`${url}weapon/${weapon_id}`)
            .then((res) => {
                let weapon = res.data
                dispatch({ type: 'VIEW_WEAPON', weapon })
            }).catch((err) => console.log(err))
    }
}
// weapon_id, author_id, comment
export function comment() {
    return (dispatch) => {

    }
}
//req.body.weapon_id
export function clap(weapon_id) {
    return (dispatch) => {
        console.log('clapping...')
        axios.post(`${url}weapon/clap`, { weapon_id }).then((res) => {
            dispatch({ type: 'CLAP_WEAPON' })
        }).catch((err) => console.log(err))
    }
}
//id, user_id
export function follow(id, user_id) {
    console.log(`${id} following ${user_id}`)
    return (dispatch) => {
        axios.post(`${url}user/follow`, { id, user_id }).then((res) => {
            dispatch({ type: 'FOLLOW_USER', user_id })
        }).catch((err) => console.log(err))
    }
}

export function SignInUser(user_data) {
    return (dispatch) => {
        console.log('adding us..')
        axios.post(`${url}user`, user_data).then((res) => {
            let user = res.data
            console.log('==================signin=======')
            console.log(user)
            console.log('==================signin=======')
            localStorage.setItem('Auth', JSON.stringify(user))
            dispatch({ type: 'SET_USER', user })
        }).catch((err) => console.log(err))
    }
}

export function SignOutUser(user_id) {
    return (dispatch) => {
            localStorage.removeItem('Auth', JSON.stringify(user))
            dispatch({ type: 'UNSET_USER' })
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: false })
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({ type: 'TOGGLE_MODAL', modalMode: true })
    }
}