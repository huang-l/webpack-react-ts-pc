import React, { useState, useEffect } from 'react';
import { Spin, Modal, Button, Form, Input } from 'antd';
import { debounce } from '@/util/commonService';

interface interfaceProps {
  isShowModal: boolean;
  changeShow: Function;
}
const ProjectAddModal = (props: interfaceProps) => {
  const { isShowModal, changeShow } = props;
  let [loading, setLoading] = useState(false);

  const componentWillUnmount = () => {
    [loading, setLoading] = [false, () => {}];
  };

  useEffect(() => {
    return componentWillUnmount;
  }, []);

  const handleCancel = () => {
    changeShow('cancel');
  };

  const handleSubmit = (fieldValue: any) => {
    changeShow('ok', fieldValue);
  };

  return (
    <Spin spinning={loading}>
      <Modal
        title="添加项目"
        open={isShowModal}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
      >
        <Form
          className="clearfix"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="项目名称"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Button className="float-right" type="primary" htmlType="submit">
            确认
          </Button>
          <Button
            className="float-right mr-10"
            htmlType="submit"
            onClick={handleCancel}
          >
            取消
          </Button>
        </Form>
      </Modal>
    </Spin>
  );
};

export default ProjectAddModal;
