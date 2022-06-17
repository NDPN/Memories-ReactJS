import { Menu, Switch } from "antd";
import Logout from "../Logout/logout";
import {
  DownOutlined,
  LeftCircleTwoTone,
  NotificationOutlined,
} from "@ant-design/icons";

export const option = (
  <Menu
    items={[
      {
        key: "logout",
        label: <Logout />,
        icon: <LeftCircleTwoTone />,
      },
      {
        key: "switch",
        label: (
          <>
            Change background color <Switch size="small" />
          </>
        ),
      },
    ]}
  />
);

export const notification = (item) => <Menu items={item} />;
