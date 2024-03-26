export interface ProjectInfo {
  id: string;
  // title: string;
}

export interface ImagePanelInfo {
  scene: any;
  geometry: any;
  textureLoader: any;
  imageSrc: string;
  x: number;
  y: number;
  z: number;
  projectInfo: ProjectInfo;
}
