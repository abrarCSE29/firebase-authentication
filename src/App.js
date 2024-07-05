import "./App.css";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC_cdOwKANJxXM4Chvitmmt2aK72qRTIFc",
  authDomain: "ema-john-simple-23d86.firebaseapp.com",
  projectId: "ema-john-simple-23d86",
  storageBucket: "ema-john-simple-23d86.appspot.com",
  messagingSenderId: "709127085885",
  appId: "1:709127085885:web:bcac7c48d3fbc51cacef54",
};

const app = initializeApp(firebaseConfig);

function App() {
  const provider = new GoogleAuthProvider();

  const [userr, setUserr] = useState({
    name: "",
    photoURL: "",
    isSignedIn: false,
  });

  const [client, setClient] = useState({
    email: "",
    password: "",
  });

  const handleSignin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        const { displayName, photoURL } = result.user;
        const signedinUser = {
          name: displayName,
          photoUrl: photoURL,
          isSignedIn: true,
        };
        setUserr(signedinUser);
      })
      .catch((error) => {});
  };

  const handleSubmit = (e) => {
    if (client.email && client.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, client.email, client.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

    e.preventDefault();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const validateCredentials = (e) => {
    let isFormValid = true;
    if (e.target.name === "password") {
      isFormValid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          e.target.value
        );
      console.log("This is password validation ", isFormValid);
    }
    if (e.target.name === "email") {
      isFormValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      console.log("This is email validation ", isFormValid);
    }

    if (isFormValid) {
      const newUserInfo = { ...client };
      newUserInfo[e.target.name] = e.target.value;
      setClient(newUserInfo);
    }
  };

  return (
    <div className="App">
      {userr.isSignedIn ? (
        <div>
          <button
            onClick={() =>
              setUserr({ isSignedIn: false, name: "", photoUrl: "" })
            }
          >
            Sign out
          </button>
          <div>
            <h1>Welcome , {userr.name}</h1>
          </div>
        </div>
      ) : (
        <div>
          <h1>Please Sign in</h1>
          <button onClick={handleSignin}>Sign in</button>
        </div>
      )}

      <h1>User Authentication</h1>
      <p>Email : {client.email}</p>
      <p>Password : {client.password}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          required
          onChange={handleChange}
          onBlur={validateCredentials}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
          onBlur={validateCredentials}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
