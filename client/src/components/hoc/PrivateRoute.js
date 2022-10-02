import { Navigate, Outlet } from 'react-router-dom';
import store from '../../actions/store';


const PrivateRoute = () => {
	return (
		store.isAuth ? <Outlet/> : <Navigate to= '/login'/>
	)

};

export default PrivateRoute;