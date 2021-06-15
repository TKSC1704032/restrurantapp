import React ,{useContext} from 'react';
import { Route, Redirect } from 'react-router';
import { User } from '../../App';
const ProtectedRoute = ({children,...rest}) => {
    const user = useContext(User);
    return (
        <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default ProtectedRoute;