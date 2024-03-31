import firebase from '~/plugins/firebase'
export default function ({ store, route, redirect }) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const redirectUrl = route.query.redirect
            console.log('redirectUrl:',route.query.redirect)
            // ログインしている場合は次の画面にリダイレクト
            if (route.name === "login") {
                return redirect("/")
            }
        } else {
            // ログインしていない場合はログイン画面にリダイレクト
            if (route.name === "mypage" || route.name === "profile" || route.name === "purchase" || route.name === "sell" ) {
                return redirect("/login")
            }
        }
    })

}


