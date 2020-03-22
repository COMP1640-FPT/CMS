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
import Chat from './components/Chat'; 

function App() {
  return (
    <Router>
      <CssBaseline />
      <Chat />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <MainLayout>
          <Switch>
            <Route exact path="/" render={() => <h1>DASHBOARD</h1>} />
            <Route exact path="/users" component={ListUser} />
            <Route exact path="/users/create" component={CreateUser} />
            <Route exact path="/majors" component={ManageMajor} />
            <Route exact path="/subjects" component={ManageSubject} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route exact path="/logout" component={Login} />
            <Route path="/" render={() => <h1>PAGE NOT FOUND</h1>} />
          </Switch>
        </MainLayout>
      </MuiPickersUtilsProvider>
    </Router>
  );
}

export default App;
