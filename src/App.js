import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MainLayout from './layouts/MainLayout';
import CreateUser from './pages/CreateUser';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListUser from './pages/ListUser';
import ManageMajor from './pages/ManageMajor';
import ManageSubject from './pages/ManageSubject';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Chat from './pages/Chat.jsx';

function App() {
  return (
    <Router>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <h1>DASHBOARD</h1>
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/chat"
            render={() => (
              <MainLayout>
                <Chat />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/users"
            render={() => (
              <MainLayout>
                <ListUser />
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
            path="/majors"
            render={() => (
              <MainLayout>
                <ManageMajor />
              </MainLayout>
            )}
          />
          <Route
            exact
            path="/subjects"
            render={() => (
              <MainLayout>
                <ManageSubject />
              </MainLayout>
            )}
          />
          <Route
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
          />
          <Route
            exact
            path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )}
          />
          <Route path="/" render={() => <h1>PAGE NOT FOUND</h1>} />
        </Switch>
      </MuiPickersUtilsProvider>
    </Router>
  );
}

export default App;
