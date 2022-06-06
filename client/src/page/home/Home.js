import { Avatar, Card, Col, Row, Image } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import { LikeTwoTone, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost } from "../../store/action/Post.action";
import CreatePost from "../../component/CreatePost/Create Post";
import UpdatePosts from "../../component/UpdatePost/Update Post";

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

  const post = selector.Post.data;
  const load = selector.Post.loading;

  // Render post
  const renderPost = (arr) => {
    let xhtml = null;

    xhtml = arr.map((item) => (
      <>
        <Card
          style={{
            marginTop: "20px",
            width: 320,
            margin: "15px",
          }}
          cover={
            item.img ? <Image height={300} alt="img" src={item.img} /> : null
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
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={item.author}
            description={item.status}
          />
        </Card>
      </>
    ));
    return xhtml;
  };

  useEffect(() => {
    const userid = selector.Auth.user._id;
    if (selector.Auth.token && selector.Auth.status === true) {
      dispatch(getPost(userid));
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

          <Row
            gutter={{
              xs: 8,
              sm: 18,
              md: 24,
              lg: 32,
            }}
          >
            {renderPost(post)}
            <UpdatePosts
              visible={openUpdateModal}
              handleOk={handleOk}
              handleCancel={handleCancel}
              item={item}
            />
          </Row>
        </Col>
        <Col className="gutter-row" span={6}>
          <div>col-6</div>
        </Col>
      </Row>
    </>
  );
}

export default Home;
