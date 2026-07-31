export function buildBreadcrumbJsonLd(
  baseUrl: string,
  crumbs: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.path.startsWith('http')
        ? crumb.path
        : `${baseUrl}${crumb.path}`,
    })),
  };
}