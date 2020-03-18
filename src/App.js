import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/" render={() => <h1>DASHBOARD</h1>} />
          <Route exact path="/users" render={() => <h1>USERS</h1>} />
          <Route exact path="/users/create" component={CreateUser} />
          <Route path="/" render={() => <h1>PAGE NOT FOUND</h1>} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
