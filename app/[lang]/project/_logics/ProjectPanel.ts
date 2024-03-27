import { MeshProps } from "@react-three/fiber";
import { IProject } from "../types";
import { Mesh, Vector3, Euler } from "three";

export default class ProjectPanel {
  mesh: Mesh;
  sphereRotationX: number;
  sphereRotationY: number;
  sphereRotationZ: number;
  prevPosition?: Vector3;
  prevScale?: Vector3;
  prevRotation?: Euler;
  info: IProject;
  isSelected: boolean = false;

  constructor(p: ProjectPanelInfo) {
    if (!p.mesh || !isMesh(p.mesh)) throw new Error("mesh가 없습니다.");
    this.mesh = p.mesh;
    this.mesh.name = "ProjPanel-" + Math.random().toString(12);
    this.mesh.lookAt(0, 0, 0);
    this.sphereRotationX = this.mesh.rotation.x;
    this.sphereRotationY = this.mesh.rotation.y;
    this.sphereRotationZ = this.mesh.rotation.z;
    this.info = p.projectInfo;
  }
}

const isMesh = (m: any): m is Mesh => m instanceof Mesh;

export interface ProjectPanelInfo {
  mesh: MeshProps;
  projectInfo: IProject;
}
