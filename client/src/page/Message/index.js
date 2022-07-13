import { Avatar, Menu, Row, Col } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MessageContainer from "../../component/Message-container";
import { getFriendList } from "../../store/action/Friend.action";

const renderFriendList = (arr) => {
  let list = [];
  if (arr?.length > 0) {
    list = arr.map((item) => ({
      key: item._id,
      label: (
        <Link to={"/message/" + item._id}>
          {item.firstName + " " + item.lastName}
        </Link>
      ),
      icon: <Avatar size={40} src={item.avatar} />,
    }));
  }
  return list;
};

function Message({ socket }) {
  const [text, setText] = useState();
  const userid = useParams();

  const selector = useSelector((root) => root);
  const dispatch = useDispatch();

  const friendID = selector.Auth.user.friend;
  const friend = selector?.Friend?.friendList;
  console.log(friend);

  useEffect(() => {
    dispatch(getFriendList(friendID));
  }, []);

  return (
    <>
      <Row>
        <Col span={6}>
          <Menu
            defaultSelectedKeys={userid.id}
            mode="inline"
            theme="light"
            items={renderFriendList(friend)}
            onClick={({ key }) => setText(key)}
          />
        </Col>
        <Col span={16} push={1}>
          <MessageContainer user={text} socket={socket} />
        </Col>
      </Row>
    </>
  );
}

export default Message;
