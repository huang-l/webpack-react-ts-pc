import React, { useState, useEffect } from "react";
import { Spin, Button, Form, Input, Radio } from "antd";
import useModal from "@/hook/useModal";
import { confirmTypes } from "@/pages/project-config/businessTypes";

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
        isParent: pageInfo.isParent,
        isDialog: pageInfo.isDialog,
      });
    }
    return componentWillUnmount;
  }, []);

  const handleSubmit = (fieldValue: any) => {
    setLoading(true);
    setTimeout(() => {
      props.onOk(fieldValue);
      setLoading(false);
    }, 0);
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
          rules={[{ required: true, message: "请输入页面名称" }]}
        >
          <Input placeholder="请输入页面名称" />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => (
            <Form.Item
              name="isParent"
              label="是否为父级页面"
              initialValue={false}
            >
              <Radio.Group disabled={getFieldValue("isDialog")}>
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
              <Radio.Group disabled={getFieldValue("isParent")}>
                {confirmTypes.map((item) => (
                  <Radio key={`${item.key}`} value={item.key}>
                    {item.value}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          )}
        </Form.Item>
        <Button className="modal-btn" type="primary" htmlType="submit">
          确认
        </Button>
        <Button
          className="modal-btn mr-10"
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
