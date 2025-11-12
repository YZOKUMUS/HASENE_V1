const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const ROOT = path.join(__dirname);
const DATA_PATH = path.join(__dirname, '..', 'kelimebul.json');

function sendJSON(res, obj){
  const body = JSON.stringify(obj);
  res.writeHead(200, {'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*'});
  res.end(body);
}

function sendFile(res, filePath){
  fs.readFile(filePath, (err, data)=>{
    if(err){ res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath).toLowerCase();
    const mime = {'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.mp3':'audio/mpeg'}[ext]||'application/octet-stream';
    res.writeHead(200, {'Content-Type':mime});
    res.end(data);
  });
}

let kelimeData = [];
try{
  const raw = fs.readFileSync(DATA_PATH,'utf8');
  kelimeData = JSON.parse(raw);
  console.log('Loaded kelimebul.json items:', kelimeData.length);
}catch(e){ console.warn('Could not load kelimebul.json from', DATA_PATH, e.message); }

const server = http.createServer((req,res)=>{
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if(pathname === '/api/kelimebul'){
    const limit = Math.max(1, Math.min(1000, parseInt(parsed.query.limit||'200',10)));
    const offset = Math.max(0, parseInt(parsed.query.offset||'0',10));
    const slice = kelimeData.slice(offset, offset+limit);
    sendJSON(res, {items: slice, total: kelimeData.length, offset, limit});
    return;
  }

  // serve prototype files
  let safePath = path.normalize(path.join(ROOT, pathname));
  if(safePath.startsWith(ROOT)){
    if(fs.existsSync(safePath) && fs.statSync(safePath).isFile()){
      sendFile(res, safePath); return;
    }
    // try index.html
    const indexPath = path.join(ROOT, 'wordgame', 'index.html');
    if(pathname === '/' || pathname === '' ){
      sendFile(res, indexPath); return;
    }
    // support /wordgame/* paths
    const tryPath = path.join(ROOT, pathname.replace(/^\/+/, ''));
    if(fs.existsSync(tryPath) && fs.statSync(tryPath).isFile()){ sendFile(res, tryPath); return; }
  }

  res.writeHead(404, {'Content-Type':'text/plain'}); res.end('Not found');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, ()=>console.log('Prototype server listening on', PORT));
