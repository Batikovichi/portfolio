import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, LockKeyhole, Video } from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { Reveal } from "@/components/reveal";
import { getProject, projects } from "@/data/projects";

type Props = { params: Promise<{slug: string}> };

export function generateStaticParams() { return projects.map(({slug})=>({slug})); }

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {title:"Project not found"};
  return {title:project.name,description:project.summary,openGraph:{title:`${project.name} — Adrian`,description:project.summary,type:"article"}};
}

export default async function ProjectPage({params}: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.findIndex(item=>item.slug===project.slug);
  const next = projects[(index+1)%projects.length];
  return <main className="project-page"><div className="container"><div className="project-back"><Link href="/#work"><ArrowLeft size={16}/> All projects</Link><span>{project.number} / {String(projects.length).padStart(2,"0")}</span></div><div className="project-hero"><div className="project-hero-top"><span className="eyebrow">{project.eyebrow}</span><span className="status-badge">{project.status}</span></div><h1>{project.name}<span>.</span></h1><p>{project.summary}</p><div className="project-hero-meta"><span>{project.repository === "Private repository" ? <LockKeyhole size={15}/> : null}{project.repository}</span>{project.demoUrl&&<a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16}/></a>}{project.sourceUrl&&<a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">Source <ArrowUpRight size={16}/></a>}</div></div><div className="project-cover"><ProjectVisual type={project.visual}/></div><div className="project-body"><div className="project-sticky"><span>THE CASE STUDY</span><div><a href="#challenge">01 / Challenge</a><a href="#approach">02 / Approach</a><a href="#details">03 / Details</a><a href="#media">04 / Media</a></div></div><div className="project-story"><Reveal><section id="challenge" className="story-section"><span className="story-number">01 / THE CHALLENGE</span><h2>Start with the real friction.</h2><p>{project.problem}</p></section></Reveal><Reveal><section id="approach" className="story-section"><span className="story-number">02 / THE APPROACH</span><h2>Build a clearer path.</h2><p>{project.solution}</p><div className="feature-list">{project.features.map((feature,i)=><div key={feature}><span>{String(i+1).padStart(2,"0")}</span><b>{feature}</b><ArrowUpRight size={17}/></div>)}</div></section></Reveal><Reveal><section id="details" className="story-section"><span className="story-number">03 / THE DETAILS</span><h2>Built with intention.</h2><div className="detail-grid"><div><h3>Stack</h3><div className="stack-pills">{project.stack.map(item=><span key={item}>{item}</span>)}</div></div><div><h3>Result & status</h3><p>{project.outcome}</p></div></div></section></Reveal><Reveal><section id="media" className="story-section media-section"><span className="story-number">04 / MEDIA</span><h2>The work, up close.</h2><p>Project visuals below are illustrative. Real screenshots and recordings will be added after review.</p><div className="media-grid">{project.mediaWishList.map((item,i)=><div className="media-placeholder" key={item}><div className="media-placeholder-icon">{item.toLowerCase().includes("video")||item.toLowerCase().includes("recording")||item.toLowerCase().includes("walkthrough")?<Video size={24}/>:<span>{String(i+1).padStart(2,"0")}</span>}</div><div><strong>{item}</strong><small>REAL PROJECT MEDIA TO ADD</small></div></div>)}</div></section></Reveal></div></div></div><Link href={`/projects/${next.slug}`} className="next-project"><div className="container"><div><span>UP NEXT / {next.number}</span><h2>{next.name}</h2></div><span className="next-arrow"><ArrowRight size={28}/></span></div></Link></main>;
}
