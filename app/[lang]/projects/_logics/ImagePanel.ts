import { throws } from "assert";
import gsap from "gsap";
import {
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  Scene,
  BufferGeometry,
  Vector3,
  Euler,
} from "three";
import { projectsConfig } from "../config";
import { ImagePanelInfo, ProjectInfo } from "../types";

export class ImagePanel {
  mesh: Mesh;
  sphereRotationX: number;
  sphereRotationY: number;
  sphereRotationZ: number;
  isSelected: boolean = false;
  prevPosition?: Vector3;
  prevScale?: Vector3;
  prevRotation?: Euler;
  projectInfo: ProjectInfo;

  constructor(info: ImagePanelInfo) {
    const texture = info.textureLoader.load(info.imageSrc);
    const material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    });

    this.mesh = new Mesh(info.geometry, material);
    this.mesh.name = "ImagePanel-" + Math.random().toString(36);
    this.mesh.position.set(info.x, info.y, info.z);
    this.mesh.lookAt(0, 0, 0);

    // Sphere 상태의 회전각을 저장해 둠
    this.sphereRotationX = this.mesh.rotation.x;
    this.sphereRotationY = this.mesh.rotation.y;
    this.sphereRotationZ = this.mesh.rotation.z;
    this.projectInfo = info.projectInfo;
    info.scene.add(this.mesh);
  }

  disSelectAnimation() {
    if (!this.isSelected) throw new Error("이미 선택되지 않은 상태입니다.");
    else if (!this.prevPosition || !this.prevScale || !this.prevRotation) {
      throw new Error("이전 상태가 저장되지 않았습니다.");
    }
    gsap.to(this.mesh.position, {
      duration: projectsConfig.selectDuration,
      x: this.prevPosition.x,
      y: this.prevPosition.y,
      z: this.prevPosition.z,
    });
    gsap.to(this.mesh.scale, {
      x: this.prevScale.x,
      y: this.prevScale.y,
      z: this.prevScale.z,
    });
    gsap.to(this.mesh.rotation, {
      x: this.prevRotation.x,
      y: this.prevRotation.y,
      z: this.prevRotation.z,
    });
    this.isSelected = false;
  }

  selectAnimation() {
    console.log("clicked");
    this.prevPosition = this.mesh.position.clone();
    this.prevScale = this.mesh.scale.clone();
    this.prevRotation = this.mesh.rotation.clone();

    gsap.to(this.mesh.position, {
      duration: projectsConfig.selectDuration,
      x: 0,
      y: 1,
      z: 2,
    });
    gsap.to(this.mesh.rotation, {
      duration: projectsConfig.selectDuration,
      x: -1,
      y: 0,
      z: 0,
    });

    gsap.to(this.mesh.scale, {
      duration: projectsConfig.selectDuration,
      x: 3,
      y: 3,
      z: 3,
    });

    this.isSelected = true;
    setTimeout(() => {
      this.disSelectAnimation();
    }, projectsConfig.selectDuration * 2 * 1000);
  }
}

export function isImagePanel(mesh: Mesh): boolean {
  console.log(mesh.name.startsWith("ImagePanel-"));
  return mesh.name.startsWith("ImagePanel-");
}
