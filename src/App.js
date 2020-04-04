import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import 'antd/dist/antd.css'; 
import Dashboard from "./pages/Dashboard";
import ListUsers from "./pages/ListUsers";
import CreateUser from "./pages/CreateUser";
import AssignUser from "./pages/AssignUser";


function App() {
  return (
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

        {/* <Route
          exact
          path="/profile"
          render={() => (
            <MainLayout>
              <Profile />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/change-password"
          render={() => (
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          )}
        /> */}
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
  );
}

export default App;
