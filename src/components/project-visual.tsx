import { ArrowUpRight, CalendarDays, Check, FileText, Play, Search, Sparkles } from "lucide-react";
import type { ProjectVisual as VisualType } from "@/data/projects";

export function ProjectVisual({ type, compact = false }: { type: VisualType; compact?: boolean }) {
  return (
    <div className={`project-visual visual-${type}${compact ? " visual-compact" : ""}`} aria-label={`${type} interface concept illustration`}>
      <div className="visual-noise" />
      {type === "bookflow" && <BookFlowVisual />}
      {type === "univer" && <UniverVisual />}
      {type === "lead-hunter" && <LeadHunterVisual />}
      {type === "diagnostic" && <DiagnosticVisual />}
      {type === "lectureai" && <LectureAIVisual />}
      {type === "beauty" && <BeautyVisual />}
      {type === "shorts" && <ShortsVisual />}
      <span className="visual-caption">Illustrative interface concept</span>
    </div>
  );
}

function WindowDots() {
  return <span className="window-dots"><i /><i /><i /></span>;
}

function BookFlowVisual() {
  return <div className="mock-window bookflow-window">
    <div className="mock-top"><WindowDots /><span>bookflow / explore</span><span>↗</span></div>
    <div className="booking-body">
      <div className="booking-heading"><span className="tiny-overline">FIND YOUR NEXT APPOINTMENT</span><strong>Good time for some you time.</strong></div>
      <div className="booking-search"><Search size={15} /><span>Service, specialist or salon</span><b>Explore</b></div>
      <div className="booking-filters"><span>All services</span><span>Today</span><span>Near me</span></div>
      <div className="booking-card"><div className="booking-art"><span>✳</span></div><div><small>ATELIER 97 · CHIȘINĂU</small><strong>Your next moment starts here</strong><p>Hair · Beauty · Care</p></div><ArrowUpRight size={18} /></div>
      <div className="booking-slots"><span>AVAILABLE TODAY</span><b>10:30</b><b>12:00</b><b>15:45</b></div>
    </div>
  </div>;
}

function UniverVisual() {
  return <div className="univer-compose">
    <div className="univer-side"><span className="univer-mark">u<span>.</span></span><span>01</span><span>02</span><span>03</span></div>
    <div className="univer-paper"><div className="univer-bar"><span>LECTURE / 024</span><WindowDots /></div><div className="univer-paper-inner"><span className="tiny-overline">FROM RECORDING TO RECALL</span><h3>A clearer way to<br />keep what you learn.</h3><div className="audio-wave">{Array.from({length: 38},(_,i)=><i key={i} style={{height:`${10+((i*17)%34)}px`}} />)}</div><div className="univer-stages"><span><Check size={13} /> Upload</span><span><Check size={13} /> Transcribe</span><span><FileText size={13} /> Notes</span></div><div className="univer-note"><b>Structured notes</b><i /><i /><i className="short" /></div></div></div>
  </div>;
}

function LeadHunterVisual() {
  return <div className="lead-board"><div className="lead-top"><span>LH / RESEARCH DESK</span><WindowDots /></div><div className="lead-heading"><span className="tiny-overline">RESEARCH BEFORE REACH</span><strong>Useful context.<br />Clear evidence.</strong></div><div className="lead-columns"><div className="lead-rail"><span className="selected">01 &nbsp; Discover</span><span>02 &nbsp; Verify</span><span>03 &nbsp; Review</span></div><div className="lead-record"><div className="record-title"><span className="record-icon">↗</span><div><b>Prospect record</b><small>PUBLIC-SOURCE SUMMARY</small></div><span className="record-check"><Check size={13}/></span></div><div className="record-line"><span>Company context</span><i /></div><div className="record-line"><span>Source evidence</span><i /></div><div className="record-line"><span>Contact route</span><i /></div><div className="record-bottom"><span>Draft only</span><ArrowUpRight size={16}/></div></div></div></div>;
}

function DiagnosticVisual() {
  return <div className="mini-ui diagnostic-ui"><span className="tiny-overline">BUSINESS DIAGNOSTIC / 04</span><h3>Find the real<br />bottleneck.</h3><div className="question-line">Where does the most time get lost?</div><div className="answer-line">Scheduling and follow-up <ArrowUpRight size={14}/></div><div className="progress-bars"><i/><i/><i/><i/><i/></div></div>;
}

function LectureAIVisual() {
  return <div className="mini-ui lecture-ui"><span className="tiny-overline">LECTURE WORKSPACE</span><h3>Learn it.<br />Then remember it.</h3><div className="lecture-card"><Sparkles size={17}/><span>Today&apos;s study set</span><b>12 cards</b></div><div className="lecture-chips"><span>Notes</span><span>Flashcards</span><span>Quiz</span></div></div>;
}

function BeautyVisual() {
  return <div className="mini-ui beauty-ui"><div className="beauty-header"><span className="beauty-avatar">✽</span><span>Beauty Bot<small>Appointment assistant</small></span><span>⋯</span></div><div className="chat-bubble">Choose a service and I&apos;ll show you available times.</div><div className="chat-actions"><span><CalendarDays size={14}/> Book a time</span><span>My bookings</span></div><div className="chat-bubble user">Tomorrow, please ↗</div></div>;
}

function ShortsVisual() {
  return <div className="mini-ui shorts-ui"><div className="shorts-preview"><div className="shorts-play"><Play size={18} fill="currentColor"/></div><span>00:18 / 00:32</span></div><div className="shorts-timeline"><span>Script</span><span>Voice</span><span>Footage</span><span>Cut</span></div><div className="shorts-tracks"><i/><i/><i/></div></div>;
}
