import React, { useMemo, useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Layout, Menu, Dropdown, Modal, message } from "antd";
import {
  HomeOutlined,
  FolderOpenOutlined,
  CalculatorOutlined,
  DownOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import cookieService from "@/util/cookieService";
import { useSelector } from "react-redux";

import styles from "./MyLayout.less";

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

const MyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const items = useMemo(
    () => [
      { label: userInfo.account, key: "name" },
      { label: "退出登录", key: "exit" },
    ],
    []
  );
  const sideItems = useMemo(
    () => [
      { label: "首页", key: "/", icon: <HomeOutlined /> },
      { label: "项目", key: "/project", icon: <FolderOpenOutlined /> },
      { label: "计算器", key: "/calculator", icon: <CalculatorOutlined /> },
    ],
    []
  );

  const [selectKey, setSelectKey] = useState("/");

  useEffect(() => {
    const token = cookieService.getCookie("token");
    if (!token) {
      navigate("/login");
    }
    setSelectKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (e: { key: string }) => {
    const { key } = e;
    if (key === "exit") {
      confirm({
        title: "确定退出登录吗?",
        icon: <ExclamationCircleFilled />,
        okText: "确认",
        cancelText: "取消",
        onOk() {
          message.success("退出登录成功!");
          cookieService.deleteCookie("token");
          navigate("/login");
        },
        onCancel() {
          message.info("已取消操作");
        },
      });
    }
  };

  const onMenuClick = (e: { key: string }) => {
    const { key } = e;
    navigate(key);
  };

  return (
    <Layout className={styles["system-layout"]}>
      <Header className={styles["system-header"]}>
        <span>个人react系统</span>
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <a onClick={(e) => e.preventDefault()}>
            {userInfo.account}
            <DownOutlined />
          </a>
        </Dropdown>
      </Header>
      <Layout className={styles["main-layout"]}>
        <Sider>
          <Menu
            className={styles["system-menu"]}
            selectedKeys={[selectKey]}
            items={sideItems}
            mode="inline"
            theme="dark"
            onClick={onMenuClick}
          />
        </Sider>
        <Content className={styles["system-main"]}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
