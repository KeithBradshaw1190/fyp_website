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
import firebase, { functions } from "firebase";
import router from "../router";
import axios from "axios";
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
    getUrlVars: function() {
      var vars = {};
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function(m, key, value) {
          vars[key] = value;
        }
      );
      return vars;
    },
    getUrlParam: function(parameter, defaultvalue) {
      var urlparameter = defaultvalue;
      if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = this.getUrlVars()[parameter];
      }
      return urlparameter;
    },
    signin: function(e) {
      //Access the verification parameters

      var url_string = window.location.href;
      var url = new URL(url_string);
      var account_token = url.searchParams.get("account_linking_token");
      var access_token = process.env.VUE_APP_FB_PAGE_ACCESS_TOKEN;

      var r_uri = url.searchParams.get("redirect_uri");

      console.log(account_token);
      console.log(r_uri);
      if (account_token != null && r_uri) {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebaseApp
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            alert(`Login successful for ${user.providerData[0].displayName}`);
            firebaseApp
              .auth()
              .currentUser.updateProfile({
                displayName: user.providerData[0].displayName
              })
              .then(() => {
                this.updateDoc(user, account_token, access_token, r_uri);
                //console.log(firebaseApp.auth().currentUser);
              })
              .catch(err => {
                console.log(err);
                this.errorMessage = err.message;
              });
          })

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
      } else {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebaseApp
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            alert(`Login successful for ${user.providerData[0].displayName}`);
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
      }
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
    },
    addToShoppingLists(resp, r_uri) {
      this.currentUser = firebaseApp.auth().currentUser;
      console.log(this.currentUser.uid);
      console.log("addtoshopping lists");
      const newDocumentBody = {
        messengerID: resp.data.recipient
      };
      db.collection("shopping_lists")
        .where("uid", "==", this.currentUser.uid)
        .get()
        .then(response => {
          let batch = db.batch();
          response.docs.forEach(doc => {
            const docRef = firebase
              .firestore()
              .collection("shopping_lists")
              .doc(doc.id);
            batch.update(docRef, newDocumentBody);
          });
          batch.commit().then(() => {
            console.log(`updated all documents inside`);
            window.location.href =
              r_uri + "&authorization_code=" + this.currentUser.uid;
          });
        })
        .catch(err => {
          console.log(err.message);

          console.log("No Shopping lists yet");
          window.location.href =
            r_uri + "&authorization_code=" + this.currentUser.uid;
        });
    },

    updateDoc: function(user, account_token, access_token, r_uri) {
      this.currentUser = firebaseApp.auth().currentUser;
      console.log("PAGE ACCESS TOKEN" + access_token);
      axios
        .get(
          "https://graph.facebook.com/v2.6/me?access_token=" +
            access_token +
            "&fields=recipient&account_linking_token=" +
            account_token
        )
        .then(resp => {
          console.log(resp.data.recipient);
          db.collection("users")
            .doc(this.currentUser.uid)
            .update({
              name: user.providerData[0].displayName,
              facebookID: user.providerData[0].uid,
              messengerID: resp.data.recipient
            })
            .then(() => {
              console.log("then");
              this.addToShoppingLists(resp, r_uri);
            })
            .catch(err => {
              console.log(err.message);
              this.errorMessage = err.message;
            });
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