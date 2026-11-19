const fs = require('fs');

async function checkArticles() {
  const articles = [
    { title: 'Hồ Chí Minh', url: 'https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh' },
    { title: 'Nguyễn Sinh Sắc', url: 'https://vi.wikipedia.org/wiki/Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc' },
    { title: 'Bến Nhà Rồng', url: 'https://vi.wikipedia.org/wiki/B%E1%BA%BFn_Nh%C3%A0_R%E1%BB%93ng' },
    { title: 'Pác Bó', url: 'https://vi.wikipedia.org/wiki/Khu_di_t%C3%ADch_P%C3%A1c_B%C3%B3' },
    { title: 'Trường Dục Thanh', url: 'https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_D%E1%BB%A5c_Thanh' },
    { title: 'Bắc Bộ Phủ', url: 'https://vi.wikipedia.org/wiki/B%E1%BA%AFc_B%E1%BB%99_ph%E1%BB%A7' }
  ];

  const foundImages = [];

  for (const art of articles) {
    console.log('Fetching article:', art.title);
    const html = await fetch(art.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }).then(r => r.text());

    // Match all mw-file-element images
    const imgMatches = html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi);
    for (const m of imgMatches) {
      let src = m[1];
      const alt = m[2];
      if (src.startsWith('//')) src = 'https:' + src;
      if (src.includes('thumb.wikimedia.org') && !src.includes('.svg') && !src.includes('Flag') && !src.includes('icon')) {
        foundImages.push({
          article: art.title,
          src,
          alt
        });
      }
    }
  }

  console.log('Found ' + foundImages.length + ' real photographic thumbnails:');
  foundImages.forEach((f, idx) => {
    console.log(`[${idx + 1}] ${f.article} | ${f.alt.slice(0, 50)} -> ${f.src}`);
  });
}

checkArticles();
