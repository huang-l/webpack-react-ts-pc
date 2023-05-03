import React from "react";
import { Button, Form, Input, message } from "antd";
import cookieService from "@/util/cookieService";
import { changeUserInfo } from "@/store/modules/user/reducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./Login.less";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    const { account, password } = values;
    cookieService.setCookie("token", `${account}${password}`, 1);
    dispatch(changeUserInfo({ account, password }));
    message.success("登录成功");
    navigate("/");
  };

  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["title"]}>个人react系统</div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="account"
          rules={[
            { required: true, message: "请输入账号" },
            {
              pattern: /^[a-zA-Z0-9@._]{3,10}$/,
              message: "长度3-10 由字母 数字 @ . _组成",
            },
          ]}
        >
          <Input placeholder="请输入账号" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            {
              pattern: /^[a-zA-Z0-9@._]{3,10}$/,
              message: "长度3-10 由字母 数字 @ . _组成",
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
