import { Avatar, Card, Col, Row, Image, List } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { LikeTwoTone, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost } from "../../store/action/Post.action";
import CreatePost from "../../component/CreatePost";
import UpdatePosts from "../../component/UpdatePost";
import { getFriendList } from "../../store/action/Friend.action";
import styles from "./styles.module.scss";

function Home() {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [item, setItem] = useState("");

  const showModal = () => {
    setOpenUpdateModal(true);
  };

  const handleOk = () => {
    setOpenUpdateModal(false);
  };

  const handleCancel = () => {
    setOpenUpdateModal(false);
  };

  // Get data
  const selector = useSelector((root) => root);
  const dispatch = useDispatch();

  const avatar = selector.Auth.user.avatar;
  const post = selector.Post.data;
  const load = selector.Post.loading;
  const friendList = selector.Friend.friendList;

  // Render post
  const renderPost = (arr) => {
    let xhtml = null;

    xhtml = arr.map((item) => (
      <div key={item._id} style={{ marginTop: "5%" }}>
        <Card
          style={{ borderRadius: "20px", border: "3px solid #bfbfbf" }}
          cover={
            item.img ? (
              <div className={styles.imgContainer}>
                <Image
                  width={"70%"}
                  className={styles.imgCard}
                  alt="img"
                  src={item.img}
                />
              </div>
            ) : null
          }
          actions={[
            <>
              <LikeTwoTone key="like" />
              <div>{item.likeCount}</div>
            </>,
            <>
              <DeleteTwoTone
                key="delete"
                onClick={() => dispatch(deletePost(item))}
              />
              <div>Delete Post</div>
            </>,
            <>
              <EditTwoTone
                key="edit"
                onClick={() => {
                  setItem(item);
                  showModal();
                }}
              />
              <div>Edit</div>
            </>,
          ]}
        >
          <Meta
            avatar={<Avatar src={avatar} />}
            title={item.author}
            description={item.status}
          />
        </Card>
      </div>
    ));
    return xhtml;
  };

  // Render friends
  const renderFriend = (arr) => {
    let xhtml = "You dont have friend yet";
    if (arr?.length > 0) {
      xhtml = (
        <List
          itemLayout="horizontal"
          dataSource={arr}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.firstName + " " + item.lastName}
              />
            </List.Item>
          )}
        />
      );
    }

    return xhtml;
  };

  useEffect(() => {
    const userid = selector.Auth.user._id;
    if (selector.Auth.token && selector.Auth.status === true) {
      dispatch(getPost(userid));
      dispatch(getFriendList(selector.Auth.user.friend));
    }
  }, []);

  return (
    <>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={18}>
          <CreatePost />

          <div className={styles.postRow}>
            {renderPost(post)}
            <UpdatePosts
              visible={openUpdateModal}
              handleOk={handleOk}
              handleCancel={handleCancel}
              item={item}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          {renderFriend(friendList)}
        </Col>
      </Row>
    </>
  );
}

export default Home;
