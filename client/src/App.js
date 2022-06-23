import { Spin } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import useAuth from "./config/customHook/useAuth";
import { ROUTE } from "./constant/Route";
import "antd/dist/antd.min.css";

const Component = (props) => {
  const route = useRoutes(ROUTE(props.auth));
  return route;
};

function App() {
  const auth = useAuth();

  const authReducer = useSelector((root) => root.Auth.authenticating);
  return (
    <div className="App">
      <BrowserRouter>
        {authReducer === true ? (
          <Spin>
            <Component auth={auth} />
          </Spin>
        ) : (
          <Component auth={auth} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
