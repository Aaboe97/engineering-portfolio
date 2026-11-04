import { withBase } from '../lib/urls';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
export const GET: APIRoute=async ({site})=>{
  const paths=['/','/projects/','/about/','/contact/',...(await getCollection('projects')).filter(p=>p.data.stage==='case-study').map(p=>`/projects/${p.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p=>`<url><loc>${new URL(withBase(p),site)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});
};
