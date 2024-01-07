import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import UsersScreen from "./screens/users";

export default function App(){
  return(
    <Provider store={store}>
      <UsersScreen />
    </Provider>
    

  );
}