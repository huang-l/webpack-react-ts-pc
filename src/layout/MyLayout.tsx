import React, { useMemo, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { Layout, Menu } from 'antd';
import { HomeOutlined, FolderOpenOutlined } from '@ant-design/icons';

import './MyLayout.less';

const { Header, Sider, Content } = Layout;

const MyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = useMemo(
    () => [
      { label: '首页', key: '/', icon: <HomeOutlined /> },
      { label: '项目', key: '/project', icon: <FolderOpenOutlined /> },
    ],
    []
  );

  const [selectKey, setSelectKey] = useState('/');

  useEffect(() => {
    setSelectKey(location.pathname);
  }, [location.pathname]);

  const onMenuClick = (e: { key: string }) => {
    const { key } = e;
    navigate(key);
  };

  return (
    <Layout className="system-layout">
      <Header className="system-header">我是头部</Header>
      <Layout>
        <Sider className="system-sider">
          <Menu
            className="system-menu"
            selectedKeys={[selectKey]}
            items={items}
            mode="inline"
            onClick={onMenuClick}
          />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyLayout;
