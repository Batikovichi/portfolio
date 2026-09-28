import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-inner"><Link href="/" className="footer-brand">a<span>.</span></Link><span>Independent software projects, built with care.</span><div><a href="https://github.com/Batikovichi" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a><a href="#top">Back to top ↑</a></div><small>© {new Date().getFullYear()} Adrian</small></div></footer>;
}
