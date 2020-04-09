import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import "antd/dist/antd.css";
import Dashboard from "./pages/Dashboard";
import ListUsers from "./pages/ListUsers";
import CreateUser from "./pages/CreateUser";
import AssignUser from "./pages/AssignUser";
import UserInfo from "./pages/UserInfo";
import Login from "./pages/Login";
import Store from "./context";
import store from "store";

function App() {
  const [data, setData] = useState({
    auth: null,
  });

  const _handleLoginSuccess = (auth) => {
    store.set("token", auth.access_token);

    setData({
      ...data,
      auth,
    });
  };

  useEffect(() => {
    return () => {
      alert("hello")
    };
  }, []);

  if (!data.auth) return <Login onSuccess={_handleLoginSuccess} />;

  return (
    <Store.Provider value={data}>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <Dashboard />
              </MainLayout>
            )}
          />
          {/* <Route
          exact
          path="/chat"
          render={() => (
            <MainLayout>
              <Chat />
            </MainLayout>
          )}
        /> */}
          <Route
            exact
            path="/users"
            render={() => (
              <MainLayout>
                <ListUsers />
              </MainLayout>
            )}
          />

          <Route
            exact
            path="/users/create"
            render={() => (
              <MainLayout>
                <CreateUser />
              </MainLayout>
            )}
          />

          <Route
            exact
            path="/users/assign"
            render={() => (
              <MainLayout>
                <AssignUser />
              </MainLayout>
            )}
          />

          <Route
            exact
            path="/users/:id"
            render={() => (
              <MainLayout>
                <UserInfo />
              </MainLayout>
            )}
          />

          <Route
            exact
            path="/login"
            render={() => (
              <MainLayout>
                {/* <Login /> */}
                <h1>Hello</h1>
              </MainLayout>
            )}
          />
          <Route path="/" render={() => <h1>PAGE NOT FOUND</h1>} />
        </Switch>
      </Router>
    </Store.Provider>
  );
}

export default App;
