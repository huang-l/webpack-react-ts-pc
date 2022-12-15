import React, { FC } from "react";
import { createPortal } from "react-dom";
import ReactDom from "react-dom/client";
import { Modal } from "antd";
// 用来处理弹窗组件
const useModal: any = (ModalComponent: FC) => {
  function WrapComponent(props: any) {
    const { title, width } = props;

    return (
      <Modal
        title={title}
        width={width}
        open={true}
        onCancel={props.onClose}
        maskClosable={false}
        footer={null}
      >
        <ModalComponent {...props} />
      </Modal>
    );
  }
  let container: HTMLDivElement | null = null;
  let root: any;
  let modal = document.getElementById("modal") as HTMLElement;
  /**
   * @params title 标题
   * @params width 宽度
   * @params winData 传参
   * @params onOk 成功之后回调
   * @params onCancel 失败之后回调
   */
  WrapComponent.show = (
    title: string,
    width: string | number,
    winData: object,
    onOk?: Function,
    onCancel?: Function
  ) => {
    if (!container) {
      container = document.createElement("div");
    }
    modal.appendChild(container);
    const params = { title, width, winData };
    function closeHandle() {
      if (container && container.tagName.toUpperCase() === "DIV") {
        root.unmount();
      }
      container = null;
    }

    function cancelHandle(...params: any[]) {
      onCancel?.(...params);
      closeHandle();
    }

    function OkHandle(...params: any[]) {
      onOk?.(...params);
      closeHandle();
    }
    root = ReactDom.createRoot(modal);
    root.render(
      createPortal(
        <WrapComponent
          {...params}
          onOk={OkHandle}
          onCancel={cancelHandle}
          onClose={closeHandle}
        />,
        container
      )
    );
  };

  WrapComponent.hide = () => {
    if (container && container.tagName.toUpperCase() === "DIV") {
      root.unmount();
    }
    container = null;
  };

  return WrapComponent;
};

export default useModal;
