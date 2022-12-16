import React, { memo } from "react";
import { Table } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { modelTypes } from "@/pages/three/businessTypes";
import ModelAddModal from "./ModelAddModal";

const Model = (props: any) => {
  const { modelList } = props;
  // 添加模型
  const addModel = debounce(() => {
    ModelAddModal.show(
      "添加模型",
      500,
      {},
      (modelInfo: { [x: string]: string }) => {
        const key = modelList.length
          ? String(Number(modelList[modelList.length - 1].key) + 1)
          : "1";
        modelList.push({ key, ...modelInfo });
        props.changeModelList(modelList);
      }
    );
  }, 300);
  // 删除模型
  const deleteModel = debounce((key: string) => {
    const newList = modelList.filter((m: { key: string }) => m.key !== key);
    props.changeModelList(newList);
  }, 300);
  const columns: any = [
    {
      title: "模型",
      key: "model",
      dataIndex: "model",
      render: (text: string, record: { key: string }) => (
        <span>{`${modelTypes.find((m) => m.key === text)?.value || "--"}-${
          record.key
        }`}</span>
      ),
    },
    {
      title: (
        <span>
          操作
          <a className="ml-5" onClick={addModel}>
            <PlusOutlined />
          </a>
        </span>
      ),
      key: "oper",
      fixed: "right",
      render: (_: string, record: { key: string }) => (
        <a onClick={() => deleteModel(record.key)}>
          <DeleteOutlined />
        </a>
      ),
    },
    ,
  ];
  return <Table columns={columns} dataSource={modelList} pagination={false} />;
};

export default memo(Model);
