// 定义项目对象接口
export interface projectObj {
  id: string;
  name: string;
}
// 定义页面对象接口
export interface pageObj {
  id: string;
  name: string;
  isParent: boolean;
  isDialog: boolean;
  projectId: string;
}
// 定义组件接口
export interface compObject {
  key: string;
  boxConfig: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}
