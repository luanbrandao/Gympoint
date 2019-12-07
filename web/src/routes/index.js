import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';

import Dashboard_Student from '../pages/Dashboard_Student';
import Profile from '../pages/Profile';
import Dashboard_Plans from '~/pages/Dashboard_Plans';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/register" component={SingUp} />
      <Route
        path="/dashboard_student"
        component={Dashboard_Student}
        isPrivate
      />
      <Route path="/dashboard_plans" component={Dashboard_Plans} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      {/* <Route path="/" component={() => <h1>404</h1>} />s */}
    </Switch>
  );
}
