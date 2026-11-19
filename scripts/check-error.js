async function test() {
  const pageUrl = 'https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:Tr%C6%B0%E1%BB%9Dng_D%E1%BB%A5c_Thanh.jpg';
  const html = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }).then(r => r.text());
  const parts = html.split('class="fullImageLink"');
  if (parts.length > 1) {
    const match = parts[1].match(/src=["'](\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+)["']/i);
    console.log('Real Match URL:', match ? match[1] : null);
    if (match) {
      const imgUrl = 'https:' + match[1].replace(/&amp;/g, '&');
      const res = await fetch(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const buf = Buffer.from(await res.arrayBuffer());
      console.log('Status:', res.status, 'Size:', buf.length, 'bytes');
    }
  }
}
test();
