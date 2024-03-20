'use client'
import { RefObject } from "react"
import { AmbientLight, AxesHelper, Camera, DirectionalLight, DirectionalLightHelper, Mesh, MeshBasicMaterial, MeshStandardMaterial, OrthographicCamera, PerspectiveCamera, PlaneGeometry, RepeatWrapping, Scene, TextureLoader, Vector2, Vector3 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import House from "./House"
import Player from "./Player"
import CONFIG from "../config"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import CONFIG_GAME from "../../_utils/config"


type CameraMode = 'perspective' | 'orthographic'
interface ConstructorParam {
  canvasRef: RefObject<HTMLCanvasElement>
  cameraMode: CameraMode
}

export default class StateVillage {
  private _isPressed = false
  private _mouse = new Vector2()
  private _canvasRef: RefObject<HTMLCanvasElement>
  private _cameraMode
  private _destinationPoint?: Vector3
  public floorMesh = meshFactory.floor()
  public pointerMesh = meshFactory.pointer()
  public spotMesh = meshFactory.spot()
  private _isdebug = true
  private _isInitialized = false

  public house: House
  public player: Player
  public meshes: Mesh[] = []
  public scene: Scene
  public cameraPosition: { [k in CameraMode]: Vector3 } = {
    perspective: new Vector3(0, 1, 2),
    orthographic: new Vector3(1, 5, 5),
  }
  public gltfLoader: GLTFLoader
  public light = {
    ambient: new AmbientLight('white', 1),
    directional: getDirectionalLight()
  }
  public camera: {
    perspective: PerspectiveCamera
    orthographic: OrthographicCamera
  }
  public controls: OrbitControls


  constructor(p: ConstructorParam) {
    this._canvasRef = p.canvasRef
    this._cameraMode = p.cameraMode
    this.scene = new Scene()
    this.gltfLoader = new GLTFLoader()
    this.house = new House({
      gltfLoader: this.gltfLoader,
      scene: this.scene,
      modelSrc: '/glb/house.glb',
      x: 5,
      y: -1.3,
      z: 2,
    })
    this.player = new Player({
      scene: this.scene,
      meshes: this.meshes,
      gltfLoader: this.gltfLoader,
      modelSrc: CONFIG_GAME.playerSrc,
    })
    this.camera = {
      perspective: getCamera.perspective(this.cameraPosition.perspective),
      orthographic: getCamera.orthographic(this.cameraPosition.orthographic),
    }
    this.controls = new OrbitControls(this.camera.perspective, this.canvas)

    this.scene.add(
      this.camera.orthographic,
      this.camera.perspective,
      this.light.ambient,
      this.light.directional,
      this.floorMesh,
      this.pointerMesh,
      this.spotMesh,
    )
    this.meshes.push(this.floorMesh)

    if (this._isdebug) {
      this.scene.add(
        new AxesHelper(3),
        new DirectionalLightHelper(this.light.directional),
      )
    }
  }
  async initialize() {
    if (this._isdebug && !this._isInitialized) {
      this._isInitialized = true
      const dat = await import('dat.gui')
      const gui = new dat.GUI();
      gui.add(this.camera.perspective.position, 'x', -5, 5, 0.1).name('카메라 trans X');
      gui.add(this.camera.perspective.position, 'y', -5, 5, 0.1).name('카메라 trans Y');
      gui.add(this.camera.perspective.position, 'z', -10, 10, 0.1).name('카메라 trans Z');
      gui.add(this.camera.perspective.rotation, 'x', -Math.PI, Math.PI, 0.1).name('카메라 rot X');
      gui.add(this.camera.perspective.rotation, 'y', -Math.PI, Math.PI, 0.1).name('카메라 rot Y');
    }
  }

  updatePosition() {
    const angle = this.player.getAngle(this.destinationPoint)
    this.player.modelMesh.position.x += Math.cos(angle) * CONFIG.player.speed
    this.player.modelMesh.position.z += Math.sin(angle) * CONFIG.player.speed
    this.camera.orthographic.position.x = this.cameraPosition.orthographic.x + this.player.modelMesh.position.x
    this.camera.orthographic.position.z = this.cameraPosition.orthographic.z + this.player.modelMesh.position.z
    this.camera.perspective.position.x = this.cameraPosition.perspective.x + this.player.modelMesh.position.x
    this.camera.perspective.position.z = (this.cameraPosition.perspective.z + this.player.modelMesh.position.z)
    // Camera의 rotation을 player의 rotation으로 설정합니다.
    // this.camera.perspective.rotation.copy(this.player.modelMesh.rotation);
    // this.camera.perspective.position.copy(this.player.modelMesh.position);
    this.player.actDefault.stop()
    this.player.actWork.play()
  }

  public get destinationPoint() {
    return this._destinationPoint ?? this.player.modelMesh.position
  }
  public set destinationPoint(value: Vector3) {
    this._destinationPoint = value
    this.pointerMesh.position.x = value.x
    this.pointerMesh.position.z = value.z

    this.player.modelMesh.lookAt(this.destinationPoint)
    this.player.moving = true
  }


  public get cameraMode() {
    return this._cameraMode
  }
  public set cameraMode(value: CameraMode) {
    this._cameraMode = value
  }

  public get cameraCurrent() {
    return this.cameraMode === 'perspective'
      ? this.camera.perspective
      : this.camera.orthographic
  }

  public get initializable() {
    return !this._isInitialized && !!this._canvasRef.current && this.player.isInitialized && typeof window !== 'undefined'
  }

  public get isInitialized(): boolean {
    return this._isInitialized && !!this._canvasRef.current && this.player.isInitialized && typeof window !== 'undefined'
  }

  public get canvas(): HTMLCanvasElement {
    if (!this._canvasRef.current) {
      throw new Error('canvas is not initialized')
    }
    return this._canvasRef.current
  }
  public get canvasExist(): boolean {
    return !!this._canvasRef.current
  }

  public get isPressed(): boolean {
    return this._isPressed
  }
  public set isPressed(value: boolean) {
    this._isPressed = value
  }
  public get mouse(): Vector2 {
    return this._mouse
  }
  public set mouse(value: Vector2) {
    this._mouse = value
  }

}

const getCamera = {
  perspective: (postion: Vector3) => {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(...postion.toArray())
    camera.updateProjectionMatrix()
    return camera
  },
  orthographic: (postion: Vector3) => {
    const camera = new OrthographicCamera(
      -(window.innerWidth / window.innerHeight), // left
      window.innerWidth / window.innerHeight, // right,
      1, // top
      -1, // bottom
      -1000,
      1000,
    )
    camera.position.set(...postion.toArray())
    camera.zoom = 0.2
    camera.updateProjectionMatrix()
    return camera
  },
}

function getDirectionalLight() {
  const directionalLight = new DirectionalLight('white', 0.5)
  const directionalLightOriginPosition = new Vector3(1, 1, 1)
  directionalLight.position.x = directionalLightOriginPosition.x
  directionalLight.position.y = directionalLightOriginPosition.y
  directionalLight.position.z = directionalLightOriginPosition.z
  directionalLight.castShadow = true

  // mapSize 세팅으로 그림자 퀄리티 설정
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  // 그림자 범위
  directionalLight.shadow.camera.left = -100
  directionalLight.shadow.camera.right = 100
  directionalLight.shadow.camera.top = 100
  directionalLight.shadow.camera.bottom = -100
  directionalLight.shadow.camera.near = -100
  directionalLight.shadow.camera.far = 100
  return directionalLight
}

const meshFactory = {
  floor: () => {
    const floorMesh = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshStandardMaterial({
        map: getGridImg(),
      }),
    )
    floorMesh.name = 'floor'
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.receiveShadow = true
    return floorMesh
  },
  pointer: () => {
    const pointerMesh = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({
        color: 'crimson',
        transparent: true,
        opacity: 0.5,
      }),
    )
    pointerMesh.rotation.x = -Math.PI / 2
    pointerMesh.position.y = 0.01
    pointerMesh.receiveShadow = true
    return pointerMesh
  },
  spot: () => {
    const spotMesh = new Mesh(
      new PlaneGeometry(3, 3),
      new MeshStandardMaterial({
        color: 'yellow',
        transparent: true,
        opacity: 0.5,
      }),
    )
    spotMesh.position.set(5, 0.005, 5)
    spotMesh.rotation.x = -Math.PI / 2
    spotMesh.receiveShadow = true
    return spotMesh
  },
}

const getGridImg = () => {
  const textureLoader = new TextureLoader()
  const floorTexture = textureLoader.load('/image/grid.png')
  floorTexture.wrapS = RepeatWrapping
  floorTexture.wrapT = RepeatWrapping
  floorTexture.repeat.x = 10
  floorTexture.repeat.y = 10
  return floorTexture
}

function getPerspectiveCameraPosition(targetPos: Vector3) {
  return new Vector3(targetPos.x, targetPos.y + 1, targetPos.z - 2)
}

// function cameraPositionByPosition(cameraPos: Vector3, tartgetPos: Vector3, mode: CameraMode) {
//   if (mode==='perspective') {
//     return position
//   } else {
//     return 
//   }
// }