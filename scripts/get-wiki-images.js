const fs = require('fs');

async function getWikiImages() {
  const url = 'https://vi.wikipedia.org/w/api.php?action=parse&page=H%E1%BB%93_Ch%C3%AD_Minh&prop=images&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'HCMResearch/1.0' } }).then(r => r.json());
  if (!res.parse || !res.parse.images) {
    console.log('No images found');
    return;
  }
  console.log('Found ' + res.parse.images.length + ' images on Wikipedia Ho Chi Minh article:');
  const valid = res.parse.images.filter(img => !img.endsWith('.svg') && !img.includes('Flag') && !img.includes('Icon'));
  valid.forEach(img => console.log('  ' + img));
}
getWikiImages();
