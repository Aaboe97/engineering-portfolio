import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import assert from 'node:assert/strict';
import { filterProjects } from '../src/scripts/project-filter.ts';
import { prefixPath } from '../src/lib/url-utils.mjs';
import { getDeployment } from '../site.config.mjs';

const root=resolve('dist');
const deployment=getDeployment();
const prefix=deployment.base==='/'?'':deployment.base;
function localPath(path){
  if(prefix && path!==prefix && !path.startsWith(prefix+'/'))throw new Error(`Path escapes the deployment prefix: ${path}`);
  return prefix?path.slice(prefix.length)||'/':path;
}
assert(existsSync(join(root,'index.html')),'Build the site before checking it.');
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(dir,e.name)):[join(dir,e.name)]);}
const files=walk(root).filter(p=>p.endsWith('.html'));
const errors=[];
const htmlCache=new Map(files.map(p=>[p,readFileSync(p,'utf8')]));
for(const [file,html] of htmlCache){
  const label=relative(root,file);
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)errors.push(`${label}: expected one primary heading`);
  if(!/<title>[^<]+<\/title>/.test(html)||!/<meta name="description" content="[^"]+"/.test(html))errors.push(`${label}: missing page metadata`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  if(new Set(ids).size!==ids.length)errors.push(`${label}: duplicate element IDs`);
  for(const [,value] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)){
    if(!value.startsWith('/')&&!value.startsWith('#'))continue;
    if(value.startsWith('//'))continue;
    const [rawPath,fragment]=value.split('#');
    let path=decodeURIComponent(rawPath.split('?')[0]);
    if(path){try{path=localPath(path);}catch(error){errors.push(`${label}: ${error.message}`);continue;}}
    let target=path?join(root,path):file;
    if(path.endsWith('/'))target=join(target,'index.html');
    if(!existsSync(target)){errors.push(`${label}: missing target ${value}`);continue;}
    if(fragment&&target.endsWith('.html')){
      const targetHtml=htmlCache.get(target)||readFileSync(target,'utf8');
      if(!targetHtml.includes(`id="${fragment}"`))errors.push(`${label}: missing anchor ${value}`);
    }
  }
}
const projectsHtml=htmlCache.get(join(root,'projects/index.html'));
const contentFiles=walk(resolve('src/content/projects')).filter(p=>p.endsWith('.md'));
const overviewCount=contentFiles.filter(p=>!/^stage:\s*case-study\s*$/m.test(readFileSync(p,'utf8'))).length;
assert.equal((projectsHtml.match(/<article\s[^>]*data-project-card/g)||[]).length,contentFiles.length,'Every project must appear in the catalogue.');
assert.equal((projectsHtml.match(/class="project-dialog"/g)||[]).length,overviewCount,'Every overview must have an accessible dialog.');
const samples=[{tags:'mechanical energy',search:'battery cooling onshape'},{tags:'aerodynamics experiments',search:'airfoil openfoam piv'},{tags:'numerical',search:'neural network numpy jax'}];
assert.equal(prefixPath('/projects/','/portfolio/'),'/portfolio/projects/');
assert.equal(prefixPath('/portfolio/projects/','/portfolio/'),'/portfolio/projects/');
assert.equal(prefixPath('/','/portfolio/'),'/portfolio/');
assert.equal(prefixPath('/images/portrait.jpg','/'),'/images/portrait.jpg');
assert.equal(prefixPath('/about/#experience','/portfolio/'),'/portfolio/about/#experience');
assert.equal(prefixPath('https://example.org/file.pdf','/portfolio/'),'https://example.org/file.pdf');
assert.equal(prefixPath('mailto:hello@example.org','/portfolio/'),'mailto:hello@example.org');
assert.equal(prefixPath('#results','/portfolio/'),'#results');
assert.deepEqual(filterProjects(samples,'all',''),[true,true,true]);
assert.deepEqual(filterProjects(samples,'experiments',''),[false,true,false]);
assert.deepEqual(filterProjects(samples,'mechanical','battery cooling'),[true,false,false]);
assert.deepEqual(filterProjects(samples,'mechanical','piv'),[false,false,false]);
assert.deepEqual(filterProjects(samples,'all','  NUMPY  JAX  '),[false,false,true]);
const xml=readFileSync(join(root,'sitemap.xml'),'utf8');
for(const [,url] of xml.matchAll(/<loc>(.*?)<\/loc>/g)){
  const parsed=new URL(url);
  assert.equal(parsed.origin,deployment.site,'Sitemap must use the configured website origin.');
  const path=localPath(parsed.pathname);
  assert(existsSync(join(root,path,'index.html')),`Missing sitemap destination: ${path}`);
}
const home=htmlCache.get(join(root,'index.html'));
const expectedHome=new URL(prefixPath('/',deployment.base),deployment.site).href;
assert(home.includes(`rel="canonical" href="${expectedHome}"`),'Homepage canonical must include the deployment prefix.');
assert(home.includes(`href="${prefixPath('/documents/anders-aaboe-jensen-cv.pdf',deployment.base)}"`),'CV download must use the deployment prefix.');
assert(readFileSync(join(root,'robots.txt'),'utf8').includes(new URL(prefixPath('/sitemap.xml',deployment.base),deployment.site).href),'robots.txt must use the configured sitemap URL.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else{console.log(`Passed for ${expectedHome}: ${files.length} HTML pages, local links and assets, unique IDs, metadata, sitemap, ${contentFiles.length} projects, ${overviewCount} dialogs and combined project filters.`);}
