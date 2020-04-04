import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import CONSTANTS from "../constants";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class UploadAvatar extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.imageUrl
  };

  //   handleChange = info => {
  //     console.log(info, 'info');

  //   if (info.file.status === "uploading") {
  //     this.setState({ loading: true });
  //     return;
  //   }

  //     if (info.file.status === "done") {
  //       // Get this url from response in real world.
  //       getBase64(info.file.originFileObj, imageUrl =>
  //         this.setState({
  //           imageUrl,
  //           loading: false
  //         })
  //       );
  //     }
  //   };

  _customRequest = async request => {
    this.setState({ loading: true });

    const url = CONSTANTS.CORE.NODE_SERVER + "/users/upload-avatar";
    console.log("url", url);
    const formData = new FormData();
    formData.append("hello", "hello");
    formData.append("avatar", request.file);

    const result = await axios({
      method: "post",
      url,
      baseURL: '/',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    });

    if (result && result.data.success) {
      this.setState({
        loading: false,
        // imageUrl: result.data.results.imageUrl
      });
      this.props.onSuccess(result.data.results.imageUrl)
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    // const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={this._customRequest}
        beforeUpload={beforeUpload}
      >
        {this.props.imageUrl ? (
          <img src={CONSTANTS.CORE.AWS_S3 + this.props.imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default UploadAvatar;
