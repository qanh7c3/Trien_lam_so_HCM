const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reviewDir = path.join(process.cwd(), 'public', 'images', 'review');
const archiveDir = path.join(process.cwd(), 'public', 'images', 'archive');

async function getThumbUrl(wikiFile) {
  const pageUrl = `https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:${encodeURIComponent(wikiFile)}`;
  const html = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r => r.text());
  const parts = html.split('class="fullImageLink"');
  if (parts.length > 1) {
    const match = parts[1].match(/src=["'](\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+)["']/i);
    if (match && match[1]) {
      return 'https:' + match[1].replace(/&amp;/g, '&');
    }
  }
  return null;
}

async function fix() {
  const missing = [
    {
      wikiFile: 'Ben_Nha_Rong.JPG',
      filename: '03-ben-nha-rong-saigon.jpg'
    },
    {
      wikiFile: "Nguyen Aïn Nuä'C (Ho-Chi-Minh), délégué indochinois, Congrès communiste de Marseille, 1921, Meurisse, BNF Gallica.jpg",
      filename: '08-dai-hoi-marseille-1921.jpg'
    }
  ];

  for (const m of missing) {
    console.log('Fetching', m.filename);
    const thumb = await getThumbUrl(m.wikiFile);
    if (thumb) {
      const pReview = path.join(reviewDir, m.filename);
      const pArchive = path.join(archiveDir, m.filename);
      execSync(`curl.exe -s -L -A "Mozilla/5.0" "${thumb}" -o "${pReview}"`);
      fs.copyFileSync(pReview, pArchive);
      console.log('Saved', m.filename, fs.statSync(pReview).size, 'bytes');
    } else {
      console.log('Not found:', m.wikiFile);
    }
  }
}
fix();
