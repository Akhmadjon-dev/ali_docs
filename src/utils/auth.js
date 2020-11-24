import {auth} from '../db/firebase'
import db from '../db/firebase'


// Sign In


export const SignIn = (email, psw) => {
    return auth
    .signInWithEmailAndPassword(email, psw)
    .then(() => {
        return{msg: "Muvaffaqiyatli ro'yxatdan o'tdingiz!"}
        }
        )
    .catch(err => {
        console.log(err.message);
        return {msg: err.message};
    });
}


// Sign Up


export const SignUp = (email, psw, name, phone) => {
    return db
    .collection("admins")
    .doc(email)
    .set({
      email,
      psw,
      name,
      phone,
      items: [],
    })
    .then(() => {
      auth
        .createUserWithEmailAndPassword(email, psw)
        .then(() => {
          localStorage.setItem("email", email);
          window.location.href = "/";
        })
        .catch((err) => {
          return { msg: err.message };
        });
    })
    .catch((err) => {
      return { msg: err.message };
    });
}

//  Sign Out


export const logOut = () => {
    console.log('shit');
    return auth.signOut().then(function() {
        console.log("Sign-out successful.");
    }).catch(err => {
        return err.message
    });
}  
