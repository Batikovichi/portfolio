"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [{href:"/#work", label:"Work"},{href:"/#about", label:"About"},{href:"/#contact", label:"Contact"}];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="wordmark" onClick={()=>setOpen(false)} aria-label="Adrian — home">a<span className="wordmark-dot">.</span><span className="wordmark-name">adrian</span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(link=><Link key={link.href} href={link.href}>{link.label}</Link>)}</nav><div className="header-actions"><ThemeToggle/><a className="header-cta" href="https://github.com/Batikovichi" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={15}/></a><button type="button" className="menu-toggle" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<Menu size={23}/>}</button></div></div>{open&&<nav className="mobile-nav" aria-label="Mobile navigation">{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setOpen(false)}>{link.label}<ArrowUpRight size={17}/></Link>)}</nav>}</header>;
}
