import "./App.css";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
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

  // const [userr, setUserr] = useState({
  //   name: "",
  //   photoURL: "",
  //   isSignedIn: false,
  // });

  const [client, setClient] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validatedClient, setValidatedClient] = useState({ ...client });

  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState(false);

  // const handleSignin = () => {
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       console.log(result.user);
  //       const { displayName, photoURL } = result.user;
  //       const signedinUser = {
  //         name: displayName,
  //         photoUrl: photoURL,
  //         isSignedIn: true,
  //       };
  //       setUserr(signedinUser);
  //     })
  //     .catch((error) => {});
  // };

  const handleSubmit = (e) => {
    if (newUser) {
      if (client.email && client.password) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, client.email, client.password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            updateUserName(client.name);
            setMessage("User signed up");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });

          
        
      }
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, client.email, client.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setMessage("User Signed in");
          console.log(user);
          setValidatedClient(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

    e.preventDefault();
  };

  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("username update successful");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  }

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
      {/* {userr.isSignedIn ? (
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
      )} */}

      <h1>User Authentication</h1>
      <p>Name : {client.name}</p>
      <p>Email : {client.email}</p>
      <p>Password : {client.password}</p>


      <input type="button" value="Login" onClick={() => setNewUser(false)} />
      <input type="button" value="Signup" onClick={() => setNewUser(true)} />

      {!newUser ? (
        <div>
          <h1>LogIn</h1>
        </div>
      ) : (
        <div>
          <h1>Signup</h1>
          <input type="text" name="name" id="" placeholder="name" onBlur={validateCredentials} />
        </div>
      )}
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

      {message && <p style={{ color: "black" }}>{message}</p>}

      {validatedClient.email && (
        <div>
          {client.name},{client.email},{client.password};
        </div>
      )}
    </div>
  );
}

export default App;
