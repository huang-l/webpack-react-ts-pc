import React, { useState, useEffect } from 'react';
import { Spin, Button, Form, Input, Radio } from 'antd';
import useModal from '@/hook/useModal';
import { confirmTypes } from '../../businessTypes';

const CatalogAddModal = (props: any) => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);

  const componentWillUnmount = () => {
    [loading, setLoading] = [false, () => {}];
  };

  useEffect(() => {
    const { catalogInfo } = props.winData;
    if (catalogInfo?.id) {
      form.setFieldsValue({
        name: catalogInfo.name,
        isPage: catalogInfo.isPage,
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
          label="目录名称"
          rules={[{ required: true, message: '请输入目录名称' }]}
        >
          <Input placeholder="请输入目录名称" />
        </Form.Item>
        <Form.Item name="isPage" label="是否为页面目录" initialValue={false}>
          <Radio.Group>
            {confirmTypes.map((item) => (
              <Radio key={`${item.key}`} value={item.key}>
                {item.value}
              </Radio>
            ))}
          </Radio.Group>
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
