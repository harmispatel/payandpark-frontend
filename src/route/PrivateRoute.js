import { Routes, Route } from "react-router-dom";
export default function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
      <Routes
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Route path={{pathname: '/', state: {from: props.location}}} ></Route>}
          
      />
    )
  }
