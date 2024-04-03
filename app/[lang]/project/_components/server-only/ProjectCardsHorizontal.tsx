import PROJECTS from "../../_logics/projects";
import ProjectCard from "../ProjectCard";

export default function ProjectCardListHorizontal() {
  return (
    <div className=" flex overflow-auto gap-3 h-full">
      {PROJECTS.map((proj, idx) => {
        return <ProjectCard key={idx} p={proj} />;
      })}
    </div>
  );
}
