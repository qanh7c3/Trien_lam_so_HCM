const { execSync } = require('child_process');
const fs = require('fs');

async function test() {
  const url = 'https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:Tr%C6%B0%E1%BB%9Dng_D%E1%BB%A5c_Thanh.jpg';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const parts = html.split('class="fullImageLink"');
  if (parts.length > 1) {
    const match = parts[1].match(/src=["'](\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+)["']/i);
    if (match) {
      const imgUrl = 'https:' + match[1].replace(/&amp;/g, '&');
      console.log('imgUrl:', imgUrl);
      execSync(`curl.exe -s -L -A "Mozilla/5.0" "${imgUrl}" -o test_img.jpg`);
      const stat = fs.statSync('test_img.jpg');
      console.log('Downloaded size:', stat.size);
      if (stat.size < 5000) {
        console.log('File content preview:', fs.readFileSync('test_img.jpg', 'utf8').substring(0, 300));
      }
    }
  }
}
test();
