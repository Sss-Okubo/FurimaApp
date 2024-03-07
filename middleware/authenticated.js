//import firebase from '~/plugins/firebase'
import auth from '~/plugins/auth'

export default async function ({
    store,
    route,
    redirect
}) {
    // Storeが持っている認証状態を確認
    let isAuthenticated = store.getters['user/isAuthenticated'];

    // 未認証の状態の場合、Firebaseの認証状況を確認して最新の状況を取得。
    if (!isAuthenticated) {
        await auth().then(user => {
            if (user) {
                // Firebase上では承認ができているので、Storeも認証済に更新する
                isAuthenticated = true;
         //       store.dispatch('user/setSignedIn', true);
            }
        });
    }

    // 未認証かつログインページ以外に飛ぼうとしている場合
    if (!isAuthenticated && route.name !== 'login') {
        redirect('/login');
    }

    // 認証済だがログインページに飛ぼうとしている場合は、トップページにリダイレクト
    if (isAuthenticated && route.name === 'login') {
        redirect('/')
    }
}
// export default function ({ store, route, redirect }) {
//     const userLogin = firebase.auth().currentUser
//     //const userLogin = firebase.auth().currentUser
//     console.log(userLogin)

//     if (userLogin) {
//         //ログインしているとき
//         if (route.name === "login" ) {
//             alert("ログオン");
//             return redirect("/")
//         }

//        // return
//     }
//     else {
//         //ログインしていないとき → diagnose, recordlist, result, top, recordは入れない
//         if (route.name === "diagnose" || route.name === "recordlist" || route.name === "result" || route.name === "index" || route.name === "record" || route.name === "default") {    
//                 alert("ログoff");
//         return redirect("/login")
//         }

//        // return redirect("/pages/login")
//         //return
//     }
//}