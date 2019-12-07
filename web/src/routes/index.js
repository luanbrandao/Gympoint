import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';

import Dashboard_Students from '../pages/Dashboard_Students';
import Profile from '../pages/Profile';
import Dashboard_Plans from '~/pages/Dashboard_Plans';
import Dashboard_Registrations from '~/pages/Dashboard_Registrations';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/register" component={SingUp} />
      <Route
        path="/dashboard_students"
        component={Dashboard_Students}
        isPrivate
      />
      <Route path="/dashboard_plans" component={Dashboard_Plans} isPrivate />
      <Route
        path="/dashboard_registrations"
        component={Dashboard_Registrations}
        isPrivate
      />
      <Route path="/profile" component={Profile} isPrivate />
      {/* <Route path="/" component={() => <h1>404</h1>} />s */}
    </Switch>
  );
}
