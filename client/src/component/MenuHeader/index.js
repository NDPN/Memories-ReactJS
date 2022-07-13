import { Badge, Button, Card, Col, Dropdown, Input, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTE_LAYOUT, ROUTE_LAYOUT_LG } from "../../constant/Route";
import { findUserByName } from "../../store/action/User.action";
import { DownOutlined, NotificationOutlined } from "@ant-design/icons";
import { option, notification } from "../Menu-Dropdown";
import { acceptFriendReq } from "../../store/action/Friend.action";
import Meta from "antd/lib/card/Meta";
import Avatar from "antd/lib/avatar/avatar";

export default function MenuHeaderLg({ request, user, size }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(request);

  const [string, setString] = useState([
    {
      string: "",
    },
    {
      string: "",
    },
  ]);

  const acceptFriendRequest = (id1, id2) => {
    const id = {
      userAcceptId: id1,
      userRequestId: id2,
    };
    dispatch(acceptFriendReq(id)).then(() => navigate(0));
  };

  const notificationRequest = (arr) => {
    let noti = null;
    let menu = [
      {
        key: "null",
        label: <>You don't have any notification now </>,
      },
    ];

    if (arr !== undefined) {
      noti = arr.map(
        (item) =>
          (menu = {
            key: item[0],
            label: (
              <Card
                style={{
                  width: 300,
                }}
                actions={[
                  <div
                    onClick={() =>
                      acceptFriendRequest(user._id, item[0].toString())
                    }
                  >
                    Accept
                  </div>,
                  <div>Decline</div>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={item[2].toString()} />}
                  title={item[1]}
                  description="Have send a friend request"
                />
              </Card>
            ),
          })
      );
    }

    if (arr !== undefined && arr.length === 0) {
      noti = menu;
    }

    return noti;
  };

  const windowWidth = () => {
    if (size?.width < 968) {
      setString([
        {
          string: null,
        },
        {
          string: null,
        },
      ]);
    } else {
      setString([
        {
          string: "Option",
        },
        {
          string: "Notification",
        },
      ]);
    }
  };

  useEffect(() => {
    windowWidth();
  }, [size]);

  return (
    <>
      <Col span={8}>
        <Input
          placeholder="Find some friend"
          style={{
            float: "left",
            width: "55%",
            height: "31px",
            margin: "16px 24px 16px 0",
            background: "white",
            fontSize: "10",
            borderRadius: "10px",
          }}
          onPressEnter={(e) =>
            dispatch(findUserByName({ name: e.target.value })).then(() =>
              navigate("/search/" + e.target.value)
            )
          }
        />
      </Col>
      <Col span={10}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={location.pathname.split("/")[1]}
          items={
            size?.width > 968
              ? ROUTE_LAYOUT(user._id)
              : ROUTE_LAYOUT_LG(user._id)
          }
        />
      </Col>
      <Col span={3}>
        <Dropdown
          overlay={option}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}
          trigger="click"
        >
          <Button
            style={{ background: "#001529", color: "white" }}
            shape="square"
          >
            {string[0].string}
            <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
      <Col span={3}>
        <Dropdown
          overlay={notification(notificationRequest(request))}
          placement="bottom"
          arrow={{
            pointAtCenter: true,
          }}
          trigger="hover"
        >
          <Badge count={request === undefined ? 0 : request.length}>
            <Button
              shape="square"
              icon={<NotificationOutlined />}
              style={{ background: "#001529", color: "white" }}
            >
              {string[1].string}
            </Button>
          </Badge>
        </Dropdown>
      </Col>
    </>
  );
}
