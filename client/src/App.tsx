import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import {observer} from "mobx-react-lite";
import MainPage from "./components/MainPage";

const App: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  if (store.isLoading) {
    return <div></div>;
  }

  if (!store.isAuth) {
    return (
        <div>
              <LoginForm/>
        </div>
    )
  }


  return (
      <div>
        <MainPage/>
      </div>
  )
}

export default observer(App);
