import {ChipList} from '@/components/client-only/ChipList'
import themeList from '@/config/variants/list'
import {paragraph, subtitle, title, typo} from '@/config/variants/primitives'

import clsx from 'clsx'

import ProjectContent from '../../project/_components/ProjectContent'
import ProjectCardListHorizontal from '../../project/_components/server-only/ProjectCardsHorizontal'
import PROJECTS from '../../project/_logics/projects'
import styles from '../styles.module.css'

import CertSection from './Cert'
import {HeaderAbout} from './Header'
import LinksContent from './LinksContent'

export default function AboutSectionsKo(props: {certData: string[]}) {
  const {certData} = props
  const {ol: olClasses} = themeList()
  const expCompany = [
    {
      name: 'intellisys',
      period: '2020.01 ~ 2022.06',
      position: 'Developer Manager, Fullstack Developer',
      describe: `
      추천 솔루션 회사로 AI 모델 개발자를 서포트하여 Kubernetes 환경에서의 API서버(python), Web서버(Vue/React), 다양한 workflows(Argo, RabbitMQ/dramatiq) 서비스를 구축/유지보수, 데이터 분석 등 다양한 업무를 담당하였습니다.
      `,
    },
    {
      name: 'inout box',
      period: '2022.06 ~ 2023.03',
      position: 'Fullstack Developer',
      describe: `
      개발의 모든 분야(인프라 to 프론트)를 담당하여 안정적인 서비스를 구축하는 것을 목적으로 진행했던 개인 사업, 결과적으로 의류 도매 플랫폼 웹/앱, 캠핑 모바일 앱 제작등 다양한 경험을 쌓았습니다.
      `,
    },
    {
      name: 'Abacus',
      period: '2023.03 ~ Present',
      position: 'Frontend Developer',
      describe: `SI 회사, 주 협력사인 LG, SK와 K8S, EC2, On-Premise 등 개발환경에 맞추어 소프트웨어를 제공했으며 주로 Front End Project Leader 로서 기획 – 설계 – 개발 프로세스에서  Cross Functional Team 들간 커뮤니케이션, 주요 이슈 해결을 도맡았습니다.`,
    },
  ]

  const expSkill = [
    {
      ctgr: 'Frontend',
      skills: ['React', 'Vue', 'Flutter(Mobile)'],
    },
    {
      ctgr: 'Infra',
      skills: ['GCP', 'AWS', 'Firebase', 'Kubernetes', 'Docker', 'Linux', 'Nginx', 'RabbitMQ'],
    },
    {
      ctgr: 'Backend',
      skills: ['python', 'nodejs', 'java', 'golang'],
    },
    {
      ctgr: 'Etc',
      skills: ['Git', 'Jira', 'Confluence', 'Typescript'],
    },
  ]

  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <HeaderAbout title="About a Developer" />
        <h3 className={title({size: 'md', fullWidth: true})}>I am SeongPilChoi.</h3>
        <p className={paragraph({size: 'sm', font: 'mono'})}>
          저는 협업과 소통을 무엇보다도 중요하게 생각하는 개발자입니다. <br />
          팀원들 간의 원활한 소통이 없이는 프로젝트의 성과를 이루는 것이 어렵다고 믿습니다. <br />
          따라서 저는 항상 열린 자세로 다른 부서와 소통하며, 상호간의 의견을 존중하고 조율합니다. <br />
          특히, 기획자나 디자이너와의 협업에서는 서로의 역할과 목표를 명확하게 정의하고, 그에 따른 일정을 철저히
          준수합니다. <br />
          또한, 세심한 성격을 바탕으로 업무를 계획하고 실행함으로써 팀원들에게 신뢰를 줍니다. <br />
          이를 통해 팀 전체가 함께 성장하고 발전할 수 있도록 노력하고 있습니다.
          <br />
        </p>
        <ol className={clsx('block', olClasses(), paragraph({size: 'md', font: 'gothic'}))}>
          <li className=" mt-3">Cloud knowledge such as GCP</li>
          <li>Server such as (Django, Nextjs, Linux)</li>
          <li className="mb-3">Frontend such as NextJs, Vue or Nuxtjs, Flutter(Mobile)</li>
        </ol>
        <p className={clsx(paragraph({size: 'md', font: 'mono'}), 'my-5 block')}>
          저는 여가시간에도 자기개발을 즐깁니다 특히 주말은, 제 아이디어를 구현할 설레는 날입니다. <br />
          서버 관련지식이 부족하다 느꼈을때, 리눅스 관련 자격증(LFCS)을 취득했습니다. <br />
          모바일 앱을 만들고 싶어서 Flutter를 공부하고, 캠핑/의류 업체용 앱을 출시했습니다. <br />
          회사에서 쿠버네티스 환경에 배포하는 프로젝트를 맡았을 때, 쿠버네티스 자격증(CKA)을 취득했습니다.
        </p>
        <p className={clsx(paragraph({size: 'md', font: 'mono'}), '!block')}>
          최근에는 WebGL과 3D(Three.js and Blender) 분야에 관심을 가지고 있습니다. <br />전 항상 Udemy, Inflearn ,
          Youtube와 친하게 지내고있습니다.
        </p>
      </section>
      <section className={styles.section}>
        <HeaderAbout title="Experience" />
        <div className="w-full flex flex-col">
          <div className="flex flex-col  justify-start items-start">
            <div className={clsx(subtitle({weight: 'bold'}), 'text-left')}>Company</div>
            <ul>
              {expCompany.map((exp, idx) => (
                <li key={idx} className=" flex flex-col text-start my-1 md:my-2 ">
                  <div
                    className={clsx(
                      typo({
                        size: 'sm',
                        font: 'gothic',
                        weight: 'bold',
                      }),
                      '!m-0 !p-0',
                    )}
                  >
                    {exp.name} / {exp.period} / {exp.position}
                  </div>
                  {/* add bottom line */}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-start items-start text-right max-h-[60vh] overflow-auto border border-gray-200 rounded-lg px-3 w-[90vw]">
            <div className={clsx(subtitle({weight: 'bold'}))}>Skill</div>
            <ul className="ml-auto">
              {expSkill.map((exp, idx) => (
                <li key={idx} className=" flex flex-col sm:my-2 md:my-4 text-end">
                  <div
                    className={clsx(
                      typo({
                        size: 'sm',
                        font: 'gothic',
                        color: 'gray',
                        weight: 'bold',
                      }),
                    )}
                  >
                    {exp.ctgr}
                  </div>
                  <ChipList
                    tags={exp.skills}
                    className="justify-end whitespace-nowrap inline-flex flex-wrap max-w-[80vw]"
                    chipProps={{
                      color: 'warning',
                      variant: 'bordered',
                      classNames: {
                        base: 'min-w-30 p-2 md:p-5 mx-1 sm:mx-2 min-w-fit',
                        content: clsx(typo({size: 'sm'})),
                      },
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        {/* when larger then md max width is 50% */}
        <HeaderAbout title="Certifications" />
        <CertSection certData={certData} scrollContainer="#about-root" />
      </section>
      <section className={styles.section}>
        <HeaderAbout title="Projects" />
        <p className={clsx(paragraph({size: 'sm', font: 'gothic'}), 'hidden md:block')}>
          개발 5년차에 접어든 지금까지 다양한 프로젝트를 경험했습니다. 비록 혼자 인프라에서 프론트엔드까지 서비스를 만들
          수 있지만 <br />
          가장 좋은 서비스를 만들 때는 언제나 동료와 함께했습니다. 그래서 언제나 최고의 동료가 되기 위해 노력합니다.
        </p>
        <ProjectCardListHorizontal />
      </section>
      <section className={styles.section}>
        <LinksContent />
      </section>
      <section className={clsx(styles.section, 'max-h-screen overflow-auto')}>
        {PROJECTS.map((proj, idx) => {
          return <ProjectContent key={idx + proj.id} post={proj} />
        })}
      </section>
    </div>
  )
}
