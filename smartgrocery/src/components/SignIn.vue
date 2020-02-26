<template>
  <div id="signIn">
    <button type="button" @click="signin" class="btn" style="background-color:#3b5998;">
      <i class="fab fa-facebook-f pr-1"></i>Sign in with Facebook
    </button>

    <!-- <form class="form-signin">
              <div class="form-label-group">
                <input
                  type="email"
                  id="inputEmail"
                  class="form-control"
                  v-model="email"
                  placeholder="Email address"
                  required
                  autofocus
                />
              </div>
              <br />
              <div class="form-label-group">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <button
                class="btn btn-lg btn-primary btn-outline-primary"
                @click="signin"
                type="submit"
              >Log In</button>
    </form>-->
  </div>
</template>

<style>
</style>
<script>
import firebaseApp from "../firebaseInit";
import firebase from "firebase";
import router from "../router";
const db = firebaseApp.firestore();
export default {
  name: "signin",
  data: function() {
    return {
      email: "",
      password: "",
      currentUser: firebaseApp.auth().currentUser
    };
  },
  methods: {
    signin: function(e) {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebaseApp
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          //console.log(result);
          console.log(user);
          alert(`Login successful for ${user.providerData[0].displayName}`);
          //console.log(user);

          firebaseApp
            .auth()
            .currentUser.updateProfile({
              displayName: user.providerData[0].displayName
            })
            .then(() => {
              this.currentUser = firebaseApp.auth().currentUser;
              //console.log(firebaseApp.auth().currentUser);
              db.collection("users")
                .doc(this.currentUser.uid)
                .update({
                  name: user.providerData[0].displayName,
                  facebookID: user.providerData[0].uid
                })
                .then(() => {
                  this.loadData();
                  router.go({ name: "groceryDashboard" });
                })
                .catch(err => {
                  this.errorMessage = err.message;
                });
            })
            .catch(err => {
              console.log(err);
              this.errorMessage = err.message;
            });
        })

        // .then(function(result) {
        //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //   var token = result.credential.accessToken;
        //   // The signed-in user info.
        //   var user = result.user;
        //   // ...
        //   //console.log(result);
        //   console.log(user);
        //   alert(`Login successful for ${user.providerData[0]}`);
        //   //console.log(user);
        // })
        .catch(function(error) {
          console.log(error);
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    loadData: function() {
      console.log("Checking storage" + sessionStorage.getItem("storeId"));
      console.log("uid: " + this.currentUser.uid);

      // you can load data from here and assign response in to variable
      db.collection("users")
        .doc(this.currentUser.uid)
        .get()
        .then(function(doc) {
          if (doc.exists && doc.get("storeId")) {
            console.log(doc.get("storeId"));
            sessionStorage.setItem("storeId", doc.get("storeId"));
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
    // signin: function(e) {
    //   fb.auth()
    //     .signInWithEmailAndPassword(this.email, this.password)
    //     .then(
    //       user => {
    //         alert(`Login successful for ${user.user.email}`);
    //         router.go({ name: "groceryDashboard" });
    //         console.log(user);
    //       },
    //       err => {
    //         alert("error " + err.message);
    //       }
    //     );
    //   e.preventDefault();
    // }
  }
};
</script>
<style scoped>
.btn {
  display: inline-block;
  background: var(--primary-color);
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-radius: 30px;
  margin-top: 0.2rem;
}
</style>