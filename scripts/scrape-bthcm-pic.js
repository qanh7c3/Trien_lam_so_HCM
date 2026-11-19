const fs = require('fs');

async function getArticles() {
  const urls = [
    'https://baotanghochiminh.vn/hien-vat-ke-chuyen.html',
    'https://baotanghochiminh.vn/nhan-vat-su-kien.html',
    'https://baotanghochiminh.vn/cuoc-doi-va-su-nghiep.html'
  ];
  for (const u of urls) {
    try {
      const html = await fetch(u).then(r => r.text());
      const re = /\/pic\/[^"'>\s]+\.(?:jpg|png|jpeg)/gi;
      const matches = html.match(re) || [];
      console.log(u + ' -> ' + matches.length + ' images');
      const unique = Array.from(new Set(matches));
      unique.slice(0, 10).forEach(m => console.log('  https://baotanghochiminh.vn' + m));
    } catch (e) {
      console.error(e.message);
    }
  }
}
getArticles();
