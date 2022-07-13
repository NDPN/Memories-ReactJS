import { Spin } from "antd";
import { useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import useAuth from "./config/customHook/useAuth";
import { ROUTE } from "./constant/Route";
import "antd/dist/antd.min.css";
import io from "socket.io-client";
import { useEffect, useRef } from "react";

const Component = (props) => {
  const route = useRoutes(ROUTE(props));
  return route;
};

function App() {
  const auth = useAuth();
  const socket = useRef();
  const authReducer = useSelector((root) => root.Auth.authenticating);

  useEffect(() => {
    if (auth) {
      socket.current = io("http://localhost:5000");
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {authReducer === true ? (
          <Spin>
            <Component auth={auth} socket={socket.current} />
          </Spin>
        ) : (
          <Component auth={auth} socket={socket.current} />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
