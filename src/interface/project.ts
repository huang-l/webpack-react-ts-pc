// 定义项目对象接口
export interface projectObj {
  id: string;
  name: string;
}
// 定义目录对象接口
export interface catalogObj {
  id: string;
  name: string;
  isPage: boolean;
  projectId: string;
}
// 定义页面对象接口
export interface pageObj {
  id: string;
  name: string;
  isMenu: boolean;
  isDialog: boolean;
  projectId: string;
}
