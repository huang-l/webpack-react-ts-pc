import React, { useState, useEffect } from 'react';
import { Spin, Button, Form, Input, Radio } from 'antd';
import useModal from '@/hook/useModal';

const CatalogAddModal = (props: any) => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);

  const componentWillUnmount = () => {
    [loading, setLoading] = [false, () => {}];
  };

  useEffect(() => {
    const { catalog } = props.winData;
    if (catalog?.id) {
      form.setFieldsValue({
        name: catalog.name,
      });
    }
    return componentWillUnmount;
  }, []);

  const handleSubmit = (fieldValue: any) => {
    props.onOk(fieldValue);
  };

  const options = [
    { label: '是', value: true },
    { label: '否', value: false },
  ];

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
          label="目录名称"
          rules={[{ required: true, message: '请输入目录名称' }]}
        >
          <Input placeholder="请输入目录名称" />
        </Form.Item>
        <Form.Item name="isPage" label="是否为页面目录" initialValue={false}>
          <Radio.Group options={options} />
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

export default useModal(CatalogAddModal);
