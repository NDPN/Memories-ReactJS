import { Avatar, List } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findUserByName } from "../../store/action/User.action";

function Finduser() {
  const data = useSelector((root) => root.User.users);

  const user = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findUserByName({ name: user.name }));
  }, []);

  return (
    <div>
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="Move-to-profile" href={"/profile/" + item._id}>
                Move to profile
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={70} src={item.avatar} />}
              title={<p>{item.lastName + " " + item.firstName}</p>}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Finduser;
