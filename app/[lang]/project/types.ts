export interface ImagePanelInfo {
  scene: any;
  geometry: any;
  textureLoader: any;
  imageSrc: string;
  x: number;
  y: number;
  z: number;
  projectInfo: IProject;
}

export type TProjType = "web" | "app";

export interface IProject {
  title: string;
  desc: string;
  projType: TProjType;
  titleImg?: string;
  using: string[];
  usingDetail: string[];
  usingPubIdx?: number[];
  whiteImg?: boolean;
  to?: string;
  allImg: string[];
  description: string[];
  myRole: string;
  roleDetail: string[];
  earned: string[];
}
