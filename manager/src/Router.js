import React from 'react';
import {Scene, Stack, Router, Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from "./components/EmployeeCreate";

const RouterComponent = () => {
  return (
      <Router sceneStyle={{paddingTop: 10}}>
        <Scene key="root" hideNavBar>
          <Scene key="auth" headerMode="none" hideNavBar>
            <Scene initial key="login" component={LoginForm} title="Please Login"/>
          </Scene>

          <Scene key="main">
            <Scene
                key="employeeList"
                component={EmployeeList}
                title="Employee List"
                rightTitle="Add"
                onRight={() => {Actions.employeeCreate()}}
                initial
            />
            <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
          </Scene>
        </Scene>
      </Router>
  )
};

export default RouterComponent