export function filterProjects(projects: { tags: string; search: string }[], discipline: string, query: string): boolean[] {
  const terms=query.toLowerCase().split(/\s+/).filter(Boolean);
  return projects.map(project => (discipline==='all'||project.tags.split(' ').includes(discipline))&&terms.every(term=>project.search.toLowerCase().includes(term)));
}
