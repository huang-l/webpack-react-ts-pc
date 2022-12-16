import React from "react";
import { Button, Form, Select } from "antd";
import {
  modelTypes,
  geometryTypes,
  materialTypes,
} from "@/pages/three/businessTypes";
import useModal from "@/hook/useModal";

const ModelAddModal = (props: any) => {
  const [form] = Form.useForm();

  // 修改模型类型
  const modelTypeChange = () => {
    form.setFieldsValue({ material: undefined });
  };

  const handleSubmit = (fieldValue: { [x: string]: string }) => {
    props.onOk(fieldValue);
  };

  return (
    <Form
      className="clearfix"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        name="model"
        label="模型类型"
        rules={[{ required: true, message: "请选择模型类型" }]}
      >
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          placeholder="请选择模型类型"
          onChange={modelTypeChange}
        >
          {modelTypes.map((model) => (
            <Select.Option
              key={model.key}
              value={model.key}
              title={model.value}
            >
              {model.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="geometry"
        label="几何体"
        rules={[{ required: true, message: "请选择几何体类型" }]}
      >
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          placeholder="请选择几何体类型"
        >
          {geometryTypes.map((geometry) => (
            <Select.Option
              key={geometry.key}
              value={geometry.key}
              title={geometry.value}
            >
              {geometry.value}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {({ getFieldValue }) => {
          let materials = materialTypes;
          switch (getFieldValue("model")) {
            case "point":
              materials = materialTypes.filter(
                (m) => m.key.slice(0, 5) === "Point"
              );
              break;
            case "line":
              materials = materialTypes.filter(
                (m) => m.key.slice(0, 4) === "Line"
              );
              break;
            case "mesh":
              materials = materialTypes.filter(
                (m) => m.key.slice(0, 4) === "Mesh"
              );
              break;
            default:
              break;
          }
          return (
            <Form.Item
              name="material"
              label="材质"
              rules={[{ required: true, message: "请选择材质类型" }]}
            >
              <Select
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                placeholder="请选择材质类型"
              >
                {materials.map((material) => (
                  <Select.Option
                    key={material.key}
                    value={material.key}
                    title={material.value}
                  >
                    {material.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          );
        }}
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
  );
};

export default useModal(ModelAddModal);
