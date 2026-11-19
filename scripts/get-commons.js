async function getCategoryImages() {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Ho_Chi_Minh&cmnamespace=6&cmlimit=50&format=json';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  console.log('Category files:', data.query.categorymembers.map(m => m.title));
}
getCategoryImages();
