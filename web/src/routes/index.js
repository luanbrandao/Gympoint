import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '../pages/SingIn';
import SingUp from '../pages/SingUp';

import Dashboard_Students from '../pages/Dashboard_Students';
import Edit_Student from '../pages/Edit_Student';
import Register_Student from '~/pages/Register_Student';
import Profile from '../pages/Profile';
import Dashboard_Plans from '~/pages/Dashboard_Plans';
import Register_Plan from '~/pages/Register_Plan';
import Dashboard_Registrations from '~/pages/Dashboard_Registrations';
import Dashboard_Help_Orders from '~/pages/Dashboard_Help_Orders';

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
      <Route path="/resister_student" component={Register_Student} isPrivate />
      <Route path="/edit_student" component={Edit_Student} isPrivate />
      <Route path="/dashboard_plans" component={Dashboard_Plans} isPrivate />
      <Route path="/register_plan" component={Register_Plan} isPrivate />

      <Route
        path="/dashboard_registrations"
        component={Dashboard_Registrations}
        isPrivate
      />
      <Route
        path="/dashboard_help_orders"
        component={Dashboard_Help_Orders}
        isPrivate
      />
      <Route path="/profile" component={Profile} isPrivate />
      {/* <Route path="/" component={() => <h1>404</h1>} />s */}
    </Switch>
  );
}
