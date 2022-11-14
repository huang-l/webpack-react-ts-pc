import React, { useState, useEffect } from 'react';
import { Spin, Button, Form, Input, Radio } from 'antd';
import useModal from '@/hook/useModal';
import { confirmTypes } from '../../businessTypes';

const PageAddModal = (props: any) => {
  const [form] = Form.useForm();
  let [loading, setLoading] = useState(false);

  const componentWillUnmount = () => {
    [loading, setLoading] = [false, () => {}];
  };

  useEffect(() => {
    const { pageInfo } = props.winData;
    if (pageInfo?.id) {
      form.setFieldsValue({
        name: pageInfo.name,
        isMenu: pageInfo.isMenu,
        isDialog: pageInfo.isDialog,
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
          label="页面名称"
          rules={[{ required: true, message: '请输入页面名称' }]}
        >
          <Input placeholder="请输入页面名称" />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => (
            <Form.Item
              name="isMenu"
              label="是否为菜单页面"
              initialValue={false}
            >
              <Radio.Group disabled={getFieldValue('isDialog')}>
                {confirmTypes.map((item) => (
                  <Radio key={`${item.key}`} value={item.key}>
                    {item.value}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          )}
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => (
            <Form.Item
              name="isDialog"
              label="是否为弹窗页面"
              initialValue={false}
            >
              <Radio.Group disabled={getFieldValue('isMenu')}>
                {confirmTypes.map((item) => (
                  <Radio key={`${item.key}`} value={item.key}>
                    {item.value}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          )}
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

export default useModal(PageAddModal);
