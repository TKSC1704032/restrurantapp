import React from 'react';
import { Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage"
import LogInPage from './components/LogInPage/LogInPage';
import fire from "./components/FirebaseAuth/FirebaseAuth";
import { createContext, useEffect, useState } from "react";
import { useHistory,useLocation,Redirect } from "react-router-dom";
import FoodMenuPage from './components/FoodMenuPage/FoodMenuPage';
import PlaceOrderPage from './components/PlaceOrder/PlaceOrderPage';
import OrderCompletePage from './components/OrderCompletePage/OrderCompletePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const LoginInfo = createContext();
const LogOut = createContext();
const User = createContext();
const Cart = createContext();
const GoogleLoc = createContext();
const App = () => {
  const [cartItems, setcartItems] = useState([]);
  const [totalItems, settotalItems] = useState(0);
  const [position, setposition] = useState({ });
  const [positionError, setpositionError] = useState({ status: false, code: "", message: "" });
  let history = useHistory();
  let location =useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setuser] = useState("");

  const handleSignUp = (newUser, setErrInfo) => {
    setErrInfo({ emailError: "", passwordError: "" });
    fire.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((userCredential) => {
        var userC = fire.auth().currentUser;
        userC.updateProfile({
          displayName: `${newUser.fname} ${newUser.lname}`,
        }).then(function () {
          // Update successful.
        }).catch(function (error) {
          console.log(error.message)
        });
        history.replace(from);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setErrInfo({ emailError: err.message });
            break;
          case "auth/weak-password":
            setErrInfo({ passwordError: err.message });
            break;

        }
      });

  }

  const handleLogIn = (newUser, setErrInfo) => {
    setErrInfo({ emailError: "", passwordError: "" });
    fire.auth().signInWithEmailAndPassword(newUser.email, newUser.password)
      .then((userCredential) => {
        var user = userCredential.user;
        history.replace(from);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setErrInfo({ emailError: err.message });
            break;
          case "auth/wrong-password":
            setErrInfo({ passwordError: err.message });
            break;

        }
      });

  }

  const handleLogOut = () => {
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged((users) => {
      if (users) {
        console.log(users.providerData[0].displayName);
        setuser(users);
      }
      else {
        setuser("");
      }
    }
    );
  }

  useEffect(() => {
    authListener();
    navigator.geolocation.getCurrentPosition((pos) => { setposition({ lat: pos.coords.latitude, lng: pos.coords.longitude }); }, (err) => { setpositionError({ status: true, code: err.code, message: err.message }); });
  }, [position])
  console.log(position)
  return (
    <>
      <GoogleLoc.Provider value={{ position, positionError }}>
        <Cart.Provider value={{ cartItems, setcartItems, totalItems, settotalItems }}>
          <LoginInfo.Provider value={{ handleSignUp, handleLogIn }}>
            <User.Provider value={user}>
              <LogOut.Provider value={handleLogOut}>
                <Switch>
                  <Route exact path="/" component={Homepage} />
                  {user==="" && <Route exact path="/login/" component={LogInPage} />}
                  <Route exact path="/menu/:index/" component={FoodMenuPage} />
                  <ProtectedRoute exact path="/placeorder/"> <PlaceOrderPage/> </ProtectedRoute>
                  <ProtectedRoute exact path="/placeorder/ordercomplete/"> <OrderCompletePage/> </ProtectedRoute>
                  <Redirect to="/"/>
                </Switch>
              </LogOut.Provider>
            </User.Provider>
          </LoginInfo.Provider>
        </Cart.Provider>
      </GoogleLoc.Provider>

    </>
  );
};
export default App;
export { Cart, LoginInfo, User, LogOut,GoogleLoc };