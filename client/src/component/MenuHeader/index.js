import { Menu } from "antd";
import React from "react";
import { ROUTE_LAYOUT } from "../../constant/Route";

function MenuHeader() {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={"Home"}
      items={ROUTE_LAYOUT}
    />
  );
}

export default MenuHeader;
