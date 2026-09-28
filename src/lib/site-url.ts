function parseSiteUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();
  if (!candidate) return undefined;

  try {
    const url = new URL(candidate);
    if (url.protocol === "https:" || (url.protocol === "http:" && url.hostname === "localhost")) {
      return url.origin;
    }
  } catch {
    // An unset or malformed deployment variable must not stop the build.
  }

  return undefined;
}

export function getSiteUrl(): string | undefined {
  const configured = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (configured) return configured;

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  return vercelHost ? parseSiteUrl(`https://${vercelHost}`) : undefined;
}
