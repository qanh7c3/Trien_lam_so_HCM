async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=15&format=json`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const data = await res.json();
  console.log(`=== Query: ${query} ===`);
  data.query.search.forEach(s => console.log(s.title));
}

async function run() {
  await searchCommons('Kim Lien Nam Dan');
  await searchCommons('Lang Sen Nghe An');
  await searchCommons('Ho Chi Minh');
  await searchCommons('Dien Bien Phu Ho Chi Minh');
}
run();
