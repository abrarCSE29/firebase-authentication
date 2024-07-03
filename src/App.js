import "./App.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
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

  const handleSignin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        const {displayName,photoURL} = result.user;
        const signedinUser = {
          name: displayName,
          photoUrl: photoURL,
          isSignedIn: true,
        };
        setUserr(signedinUser);
      })
      .catch((error) => {
      });
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
    </div>
  );
}

export default App;
