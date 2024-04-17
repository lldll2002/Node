const http = require('http');

let items = [
  { name: 'item1' },
  { name: 'item2' },
  { name: 'item3' },
  { name: 'item4' },
]

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req. method;

  if(url === '/item') {
    if (method === 'GET') {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(items))
    } 
    else if (method === 'POST') {
      const body = [];
      req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk.toString());
        body += chunk.toString();
      });
      req.on('end', () => {
        const item = JSON.parse(Buffer.concat(body).toString());
        console.log(newItem);
        item.push(newItem);
        console.log(item);
        
        res.writeHead(201);
        res.end("POST 성공");
      })
    } else if (url === '/item/item1') {
      if (method === 'PUT') {
      if (req.url.startsWith('/item/')) {
        const itemName = url.split('/')[2];
        const body = [];

        req.on('data', (chunk) => {
          console.log(chunk);
          body.push(chunk);
        })

        req.on('end', () => {
          const newItem = JSON.parse(Buffer.concat(body).toString());
        console.log(item);
        item.filter((e)=>e.name === itemName),map((e)=>e.name = newItem.name)
        console.log('put : ', item);

        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("PUT 성공");
      })
          // PUT /item/item1, body = { name: 'item1-1' }
          // item1을 item1-1로 바꾸기
          // console.log('item', item);

          // 1. Data를 받는다.
          // 2. 해당 Data을 찾는다 (url 에서 찾음)
          // 3. 해당 item 을 수정한다.
          // 4. 해당 API 결과를 도출한다.
    }} else if (method === 'DELETE') {
      const itemName = url.split('/')[2];
      //console.log(item.filter((e)=>e.name !=== itemName))
      item = item.filter((e)=>e.name !== itemName)
      console.log('item', item);

      res.writeHead(200);
      res.end("DELETE 성공");

    }} else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 에러');
    };
  }
});
server.listen(8080, () => {
  console.log('8080번 포트에서 서버 대기 중입니다');
})