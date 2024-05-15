import PROJECTS from '../../_logics/projects'
import type {IProject} from '../../types'
import ProjectCard from '../ProjectCard'

export default function ProjectCardListHorizontal(props: {projects?: IProject[]}) {
  return (
    <div className=" flex overflow-auto gap-3 h-full">
      {(props.projects ?? PROJECTS).map((proj, idx) => {
        return <ProjectCard key={idx} p={proj} />
      })}
    </div>
  )
}
