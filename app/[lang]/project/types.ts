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

export type TProjType = "web" | "app" | "webApp";
interface STAR {
  situation: string;
  task: string;
  action: string;
  result: string;
}
export interface IProject {
  id: string;
  title: string;
  projType: TProjType;
  titleImg?: string;
  using: string[];
  usingDetail: string[];
  usingPubIdx?: number[];
  whiteImg?: boolean;
  to?: string;
  allImg?: string[];
  description: string[];
  earned: string[];
  myRole: string;
  roleDetail?: string[];
  star?: STAR[]; //TODO
}
