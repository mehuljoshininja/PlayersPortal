import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Fade from 'react-fade-in';

import Header from '../Admin/Header/header';
import Login from '../Admin/Login/login';
import Dashboard from '../Admin/dashboard';
import ViewPlayerDetails from '../Admin/Player/view-player-details';
import PageNotFound from '../../Component/page-not-found';
import RegisterUser from '../User/Register/register-user';
import AddPlayer from '../Admin/Player/add-player';
import EditPlayer from '../Admin/Player/edit-player';
import Logout from '../../Component/Logout/logout';
import CRout from '../../Custom-Route/custom-rout';
import UnAuthorizedAccess from '../unauthorized-access/unauthorized-access'
import UserDashboard from '../User/dashboard';

const ADMIN = 'admin';
const USER = 'user';

function App() {
	return (
		<div><Fade>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/login' component={Login} />

					<CRout exact path='/logout' component={Logout} />
					<Route exact path='/register-user' component={RegisterUser} />

					<CRout exact cprivate crole={[ADMIN]} path='/add-player' component={AddPlayer} />
					<CRout exact cprivate crole={[ADMIN]} path='/dashboard' component={Dashboard} />

					<CRout exact cprivate crole={[USER]} path='/user-dashboard' component={UserDashboard} />
					<CRout exact cprivate crole={[ADMIN]} path='/view-player-details' component={ViewPlayerDetails} />
					<CRout exact cprivate crole={[ADMIN]} path='/edit-player' component={EditPlayer} />
					<CRout path='/unauthorized-access' component={UnAuthorizedAccess} />
					<Route exact path='/' component={Login} />
					<Route component={PageNotFound} />
				</Switch>
			</Router></Fade>
		</div>
	);
}

export default App;
