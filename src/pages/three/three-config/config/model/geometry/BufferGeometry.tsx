import React, { memo } from "react";
import { InputNumber, Table } from "antd";
import { debounce, cloneDeep } from "lodash";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const BufferGeometry = (props: { [x: string]: any }) => {
  const { gConfig } = props;

  // 添加顶点
  const addPoint = debounce(() => {
    const newConfig = cloneDeep(gConfig);
    const key = newConfig.pointList.length
      ? String(
          Number(newConfig.pointList[newConfig.pointList.length - 1].key) + 1
        )
      : "1";
    newConfig.pointList.push({ key, x: 0, y: 0, z: 0 });
    props.changeConfig(newConfig, "gConfig");
  }, 300);
  // 修改顶点列表
  const changePointList = (val: number, type: string, key: string) => {
    const newConfig = cloneDeep(gConfig);
    newConfig.pointList = newConfig.pointList.map((p: { key: string }) =>
      p.key === key ? { ...p, [type]: val } : p
    );
    props.changeConfig(newConfig, "gConfig");
  };
  // 删除顶点
  const deletePoint = debounce((key: string) => {
    const newConfig = cloneDeep(gConfig);
    newConfig.pointList = newConfig.pointList.filter(
      (m: { key: string }) => m.key !== key
    );
    props.changeConfig(newConfig, "gConfig");
  }, 300);

  // 添加法向量
  const addNormal = debounce(() => {
    const newConfig = cloneDeep(gConfig);
    const key = newConfig.normalList.length
      ? String(
          Number(newConfig.normalList[newConfig.normalList.length - 1].key) + 1
        )
      : "1";
    newConfig.normalList.push({ key, x: 0, y: 0, z: 0 });
    props.changeConfig(newConfig, "gConfig");
  }, 300);
  // 修改法向量列表
  const changeNormalList = (val: number, type: string, key: string) => {
    const newConfig = cloneDeep(gConfig);
    newConfig.normalList = newConfig.normalList.map((p: { key: string }) =>
      p.key === key ? { ...p, [type]: val } : p
    );
    props.changeConfig(newConfig, "gConfig");
  };
  // 删除法向量
  const deleteNormal = debounce((key: string) => {
    const newConfig = cloneDeep(gConfig);
    newConfig.normalList = newConfig.normalList.filter(
      (m: { key: string }) => m.key !== key
    );
    props.changeConfig(newConfig, "gConfig");
  }, 300);

  const getColumns: any = (type: string) => {
    return [
      {
        title: "x",
        key: "x",
        dataIndex: "x",
        width: 110,
        render: (text: number, record: { key: string }) => (
          <InputNumber
            value={text}
            placeholder="请输入x值"
            onChange={(val) =>
              type === "point"
                ? changePointList(val ?? 0, "x", record.key)
                : changeNormalList(val ?? 0, "x", record.key)
            }
          />
        ),
      },
      {
        title: "y",
        key: "y",
        dataIndex: "y",
        width: 110,
        render: (text: number, record: { key: string }) => (
          <InputNumber
            value={text}
            placeholder="请输入y值"
            onChange={(val) =>
              type === "point"
                ? changePointList(val ?? 0, "y", record.key)
                : changeNormalList(val ?? 0, "y", record.key)
            }
          />
        ),
      },
      {
        title: "z",
        key: "z",
        dataIndex: "z",
        width: 110,
        render: (text: number, record: { key: string }) => (
          <InputNumber
            value={text}
            placeholder="请输入z值"
            onChange={(val) =>
              type === "point"
                ? changePointList(val ?? 0, "z", record.key)
                : changeNormalList(val ?? 0, "z", record.key)
            }
          />
        ),
      },
      {
        title: (
          <span>
            操作
            <a
              className="ml-5"
              onClick={type === "point" ? addPoint : addNormal}
            >
              <PlusOutlined />
            </a>
          </span>
        ),
        key: "oper",
        width: 70,
        fixed: "right",
        render: (_: string, record: { key: string }) => (
          <a
            onClick={() =>
              type === "point"
                ? deletePoint(record.key)
                : deleteNormal(record.key)
            }
          >
            <DeleteOutlined />
          </a>
        ),
      },
      ,
    ];
  };

  return (
    <>
      <h2>顶点</h2>
      <Table
        columns={getColumns("point")}
        dataSource={gConfig.pointList}
        pagination={false}
        scroll={{ x: 230 }}
      />
      <h2>法向量</h2>
      <Table
        columns={getColumns("normal")}
        dataSource={gConfig.normalList}
        pagination={false}
        scroll={{ x: 230 }}
      />
    </>
  );
};

export default { BufferGeometry: memo(BufferGeometry) };
