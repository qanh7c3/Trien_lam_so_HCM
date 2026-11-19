const fs = require('fs');

async function getImagesFromWikiHtml() {
  const pages = [
    'https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh',
    'https://vi.wikipedia.org/wiki/Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc',
    'https://vi.wikipedia.org/wiki/B%E1%BA%BFn_Nh%C3%A0_R%E1%BB%93ng',
    'https://vi.wikipedia.org/wiki/Khu_di_t%C3%ADch_P%C3%A1c_B%C3%B3',
    'https://vi.wikipedia.org/wiki/Khu_di_t%C3%ADch_Kim_Li%C3%AAn',
    'https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_D%E1%BB%A5c_Thanh'
  ];

  const results = [];
  for (const p of pages) {
    try {
      const html = await fetch(p, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      }).then(r => r.text());
      const re = /\/\/(upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^\s"'>]+?\.(?:jpg|png|jpeg|JPG|PNG|JPEG)\/[0-9]+px-[^\s"'>]+?\.(?:jpg|png|jpeg|JPG|PNG|JPEG))/gi;
      let m;
      while ((m = re.exec(html)) !== null) {
        const fullUrl = 'https://' + m[1];
        results.push({ page: p, url: fullUrl });
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  console.log('Total thumb URLs extracted:', results.length);
  const map = new Map();
  results.forEach(r => {
    const fn = r.url.split('/').pop();
    if (!map.has(fn) && !fn.includes('Flag') && !fn.includes('Icon') && !fn.includes('svg')) {
      map.set(fn, r.url);
    }
  });

  console.log('Unique photo thumbs:', map.size);
  Array.from(map.entries()).slice(0, 30).forEach(([k, v]) => {
    console.log('  ' + k + ' -> ' + v);
  });
}
getImagesFromWikiHtml();
