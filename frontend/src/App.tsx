import React, { useState, useEffect } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Router from "./components/Router";
import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <>
      <RecoilRoot>
        <ToastContainer />
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </RecoilRoot>
    </>
  );
}

export default App;
