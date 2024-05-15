'use client'
import {ButtonHome} from '@/components/client-only/button/links'
import {title} from '@/config/variants/primitives'
import React, {useState} from 'react'

import {Button} from '@nextui-org/button'
import {useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/modal'
import {OrbitControls} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import clsx from 'clsx'

import projects from '../_logics/projects'
import {projectsConfig} from '../config'
import type {IProject} from '../types'

import ProjectCard from './ProjectCard'
import {ProjectCards} from './ProjectCards'
import type {TShape} from './ProjectCards'

export function RootCanvas() {
  const [shape, setShape] = useState<TShape>('sphere')
  const {isOpen, onOpen, onOpenChange} = useDisclosure({
    onClose() {
      setProject(null)
    },
  })
  const [project, setProject] = useState<IProject | null>(null)

  const handleProjectSelect = (projectInfo: IProject) => {
    setProject(projectInfo)
    onOpen()
  }
  const btnClass = clsx('absolute', 'top-4', 'left-4')
  return (
    <>
      <Canvas linear camera={{position: [0, 0, 1]}}>
        <OrbitControls enableDamping />
        <Lights />
        <ProjectCards onSelect={handleProjectSelect} shape={shape} projects={projects} />
      </Canvas>
      <div className={clsx(btnClass)}>
        <Button
          onClick={() => {
            setShape(shape === 'sphere' ? 'random' : 'sphere')
          }}
          className="mx-2"
        >
          Toggle Shape
        </Button>
        <ButtonHome />
      </div>
      {project && (
        <Modal
          motionProps={{
            transition: {
              duration: projectsConfig.selectDuration * 3,
              ease: 'easeInOut',
            },
          }}
          classNames={{
            base: 'w-full h-full flex justify-center items-center',
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="full"
        >
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className={title({size: 'sm'})}>{project.title}</h3>
                </ModalHeader>
                <ModalBody>
                  <ProjectCard p={project} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

function Lights() {
  // const lightRef = useRef<THREE.DirectionalLight>(null!);
  // useHelper(lightRef, DirectionalLightHelper, 3, "red");
  return (
    <>
      <ambientLight />
      <directionalLight position={[150, 150, 150]} intensity={0.55} />
      {/* <ambientLight intensity={0.5} />
      <directionalLight position={[1, 0, 2]} intensity={1} /> */}
      {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}
    </>
  )
}

export default RootCanvas
