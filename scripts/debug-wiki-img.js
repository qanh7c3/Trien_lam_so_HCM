async function debug() {
  const t = await fetch('https://vi.wikipedia.org/wiki/H%E1%BB%93_Ch%C3%AD_Minh', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  }).then(r => r.text());
  const m = t.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
  console.log('Img tags found:', m ? m.length : 0);
  if (m) {
    m.slice(0, 10).forEach(i => console.log('  ' + i));
  }
}
debug();
