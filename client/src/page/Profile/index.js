import {
  Avatar,
  Button,
  Col,
  Descriptions,
  Divider,
  message,
  Modal,
  Row,
  Upload,
} from "antd";
import {
  CameraFilled,
  PictureOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAvatar } from "../../store/action/Auth.action";

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

function Profile() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, () => {
        setLoading(false);
        setImageUrl(info.file.response.image.url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PictureOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Change your avatar
      </div>
    </div>
  );

  const selector = useSelector((root) => root);
  const user = selector.Auth.user;
  const [changeAvatarModal, setChangeAvatarModal] = useState(false);

  const showModal = () => {
    setChangeAvatarModal(true);
  };

  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(changeAvatar({ _id: user._id, urlImg: imageUrl }));
    setChangeAvatarModal(false);
  };

  const handleCancel = () => {
    setChangeAvatarModal(false);
  };

  // Render user's info
  const Info = (obj) => {
    let xhtml = null;
    xhtml = Object.keys(obj).map((key, index) => {
      if (key !== "_id" && key !== "role" && key !== "avatar") {
        return (
          <>
            <Descriptions.Item label={key}>
              {Object.values(obj)[index]}
            </Descriptions.Item>
          </>
        );
      }
    });
    return xhtml;
  };

  return (
    <>
      <Modal
        title="Change avatar"
        visible={changeAvatarModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Col push={9}>
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
        </Col>
      </Modal>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col
          span={24}
          push={100}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div>
            <Avatar size={150} src={user.avatar} />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                type="primary"
                style={{ borderRadius: "10px" }}
                icon={<CameraFilled />}
                onClick={() => showModal()}
              >
                Change Avatar
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Divider orientation="center" orientationMargin="0">
          Information
        </Divider>
        <Descriptions>{Info(user)}</Descriptions>
      </Row>
      <Row>
        <Divider orientation="center" orientationMargin="0">
          Your Album
        </Divider>
      </Row>
    </>
  );
}

export default Profile;
