import React, { useState, useEffect } from 'react';
import { Spin, Button, Form, Input } from 'antd';
import useModal from '@/hook/useModal';

const ProjectAddModal = (props: any) => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);

  const componentWillUnmount = () => {
    [loading, setLoading] = [false, () => {}];
  };

  useEffect(() => {
    const { project } = props.winData;
    if (project?.id) {
      form.setFieldsValue({
        name: project.name,
      });
    }
    return componentWillUnmount;
  }, []);

  const handleSubmit = (fieldValue: any) => {
    props.onOk(fieldValue);
  };

  return (
    <Spin spinning={loading}>
      <Form
        className="clearfix"
        form={form}
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
          onClick={props.onClose}
        >
          取消
        </Button>
      </Form>
    </Spin>
  );
};

export default useModal(ProjectAddModal);
