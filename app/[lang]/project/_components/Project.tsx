"use client";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import ProjectCanvas from "./canvas";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { IProject } from "../types";
import { projectsConfig } from "../config";
import ProjectCard from "./ProjectCard";
import { title } from "@/components/server-only/primitives";

export default function Project() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure({
    onClose() {
      setProject(null);
    },
  });
  const [project, setProject] = useState<IProject | null>(null);

  const handleProjectSelect = (projectInfo: IProject) => {
    setProject(projectInfo);
    onOpen();
  };
  return (
    <>
      <ProjectCanvas onSelect={handleProjectSelect} />
      {project && (
        <Modal
          motionProps={{
            transition: {
              duration: projectsConfig.selectDuration * 3,
              ease: "easeInOut",
            },
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className={title({ size: "sm" })}>{project.title}</h3>
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
  );
}
