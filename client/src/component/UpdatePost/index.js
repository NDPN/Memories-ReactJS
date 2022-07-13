import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../store/action/Post.action";

function UpdatePosts(props) {
  const formRef = useRef();
  const dispatch = useDispatch();

  const { _id, userOwner, likeCount, img, author } = props.item;

  // Update Post
  const updatePosts = (values) => {
    const form = {
      status: values.status,
      img: img,
      userOwner: userOwner,
      likeCount: likeCount,
      id: _id,
      author: author,
    };

    dispatch(updatePost(form));
  };

  useEffect(() => {
    if (_id) {
      formRef.current.setFieldsValue(props.item);
    }
  }, [_id]);

  return (
    <Modal
      title="Edit Your Post"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={null}
    >
      <Form initialValues={""} ref={formRef} onFinish={updatePosts}>
        <Form.Item label="Status" name="status">
          <Input
            style={{ borderRadius: "10px" }}
            placeholder="Do you want to change your mind?"
            allowClear={true}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            props.handleOk();
          }}
        >
          Update Post
        </Button>
      </Form>
    </Modal>
  );
}

export default UpdatePosts;
