import React, { memo } from "react";
import { Button, InputNumber } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./ConfigHeader.less";

const ConfigHeader = (props: any) => {
  const projectList = useSelector((state: any) => state.project.projectList);
  const { id, canvasStyle } = props;
  const project = projectList.find((p: { id: number }) => p.id === Number(id));
  const navigate = useNavigate();
  // 修改画布样式
  const changeCanvasStyle = (value: number, type: string) => {
    const cStyle = { ...canvasStyle, [type]: value };
    props.changeCanvasStyle(cStyle);
  };
  // 返回列表页
  const toList = () => {
    navigate("/project");
  };
  return (
    <div className={styles["config-header"]}>
      <span className="mr-10">{project.name || "项目名称"}</span>
      <Button className="mr-10" type="primary" onClick={toList}>
        返回
      </Button>
      <InputNumber
        className="width-140"
        placeholder="请输入宽度"
        value={canvasStyle.width}
        min={700}
        onChange={(value) =>
          changeCanvasStyle(Math.trunc(value ?? 700), "width")
        }
      />
      <InputNumber
        className="width-140 ml-10"
        placeholder="请输入高度"
        value={canvasStyle.height}
        min={500}
        onChange={(value) =>
          changeCanvasStyle(Math.trunc(value ?? 500), "height")
        }
      />
    </div>
  );
};

export default memo(ConfigHeader);
