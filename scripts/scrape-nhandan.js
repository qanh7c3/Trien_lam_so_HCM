async function getSpecialND() {
  const html = await fetch('https://special.nhandan.vn/duoc-gap-bac-ho/').then(r => r.text());
  const re = /https?:\/\/[^\s"'<>]+\.(?:jpg|png|jpeg)/gi;
  const matches = html.match(re) || [];
  console.log('Matches:', matches.length);
  const filtered = Array.from(new Set(matches)).filter(m => m.includes('nhandan.vn') || m.includes('media'));
  filtered.forEach(m => console.log('  ' + m));
}
getSpecialND();
