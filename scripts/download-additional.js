const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(process.cwd(), 'public', 'images', 'review');

const additional = [
  {
    wikiFile: 'Cốc_Bó.jpg',
    filename: '19-hang-coc-bo-pac-bo.jpg',
    title: 'Hang Cốc Bó - Suối Lê-nin (Pác Bó, Cao Bằng)',
    year: '1941',
    category: 'Địa danh lịch sử',
    location: 'Hà Quảng, Cao Bằng',
    source: 'Khu Di tích Quốc gia đặc biệt Pác Bó',
    description: 'Nơi Bác Hồ sống và làm việc bí mật những ngày đầu trở về Tổ quốc tháng 2/1941 sau 30 năm bôn ba cứu nước.'
  }
];

async function getThumbUrlFromFilePage(wikiFile) {
  const pageUrl = `https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:${encodeURIComponent(wikiFile)}`;
  try {
    const res = await fetch(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const html = await res.text();
    const parts = html.split('class="fullImageLink"');
    if (parts.length > 1) {
      const match = parts[1].match(/src=["'](\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+)["']/i);
      if (match && match[1]) {
        return 'https:' + match[1].replace(/&amp;/g, '&');
      }
      // If src doesn't match thumb, look for direct link
      const direct = parts[1].match(/<a href=["'](\/\/upload\.wikimedia\.org\/[^"']+)["']/i);
      if (direct && direct[1]) {
        return 'https:' + direct[1].replace(/&amp;/g, '&');
      }
    }
  } catch (err) {
    console.error('Scrape error:', err.message);
  }
  return null;
}

async function run() {
  for (const item of additional) {
    console.log('Downloading:', item.title);
    const thumbUrl = await getThumbUrlFromFilePage(item.wikiFile);
    if (!thumbUrl) {
      console.log('No thumb found for', item.wikiFile);
      continue;
    }
    const outPath = path.join(targetDir, item.filename);
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${thumbUrl}" -o "${outPath}"`;
    try {
      execSync(cmd);
      const stat = fs.statSync(outPath);
      console.log(`Success: ${stat.size} bytes -> ${item.filename}`);
    } catch (e) {
      console.error(e.message);
    }
  }
}
run();
