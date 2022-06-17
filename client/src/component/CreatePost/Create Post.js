import { Avatar, Button, Card, Form, Input, message, Upload } from "antd";
import { LoadingOutlined, CameraTwoTone } from "@ant-design/icons";
import React, { useState } from "react";
import { createPost } from "../../store/action/Post.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// convert img to base 64
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

function CreatePost() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const navigate = useNavigate();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <CameraTwoTone />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  // Get data
  const selector = useSelector((root) => root);
  const dispatch = useDispatch();

  const userid = selector.Auth.user._id;
  const fullname = selector.Auth.user.fullName;
  const avatar = selector.Auth.user.avatar;

  // Create Post
  const createPosts = (values) => {
    const form = {
      status: values.status,
      urlImg: values.Img[values.Img.length - 1].response.image.url,
      userid: userid,
      author: fullname,
    };

    dispatch(createPost(form));
    navigate(0);
  };

  return (
    <>
      <Card>
        <Form onFinish={createPosts}>
          <Form.Item name="status" label={<Avatar src={avatar} />}>
            <Input
              style={{ borderRadius: "10px" }}
              placeholder="What do you think?"
              allowClear={true}
            />
          </Form.Item>
          <Form.Item label="Some image do u want to share">
            <Form.Item
              name="Img"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload
                name="Img"
                listType="picture-card"
                showUploadList={false}
                action={"http://localhost:5000/api/uploadImg"}
                accept=".png,.jpeg"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "102px",
                      height: "102px",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default CreatePost;
