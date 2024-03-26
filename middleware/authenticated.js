import firebase from '~/plugins/firebase'
export default function ({ store, route, redirect }) {
    const userLogin = firebase.auth().currentUser
    console.log(userLogin)

    if (!userLogin) {
        return redirect("/login")
    }
}


