import Link from "next/link";

export default function NotFound() { return <main className="not-found container"><span>404 / NOT FOUND</span><h1>This page wandered off.</h1><p>The project may have moved. The rest of the work is still here.</p><Link href="/">Back to the portfolio →</Link></main>; }
