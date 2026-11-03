// Small dependency-free local static server. No payment, authentication, or API backend.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon'};
const port = Number(process.env.PORT || 3000);
const allowed = new Set(['/','/index.html','/customize.html','/cart.html','/styles.css','/src/core.js','/src/main.js','/src/customize.js','/src/cart.js']);
const server = http.createServer(async (req,res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405,{'Allow':'GET, HEAD'}).end(); return; }
  if (!allowed.has(p)) {res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Not found');return;}
  const filepath = path.join(root,p === '/' ? 'index.html' : p.slice(1));
  try {
    const body=await readFile(filepath);
    res.writeHead(200,{'Content-Type':mime[path.extname(filepath)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-store'});
    res.end(req.method==='HEAD'?undefined:body);
  } catch { res.writeHead(404).end('Not found'); }
});
server.listen(port,'127.0.0.1',()=>console.log(`THREADLAB demo: http://127.0.0.1:${port}`));
