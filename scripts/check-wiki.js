async function checkWiki(file) {
  const url = `https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:${encodeURIComponent(file)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  const parts = html.split('class="fullImageLink"');
  if (parts.length > 1) {
    const match = parts[1].match(/src=["'](\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+)["']/i);
    console.log(file, '-> FOUND THUMB:', match ? match[1].substring(0, 100) : 'NO MATCH');
    if (!match) {
      // Check if direct upload link exists
      const orig = parts[1].match(/href=["'](\/\/upload\.wikimedia\.org\/[^"']+)["']/i);
      console.log('   Original link:', orig ? orig[1] : 'NONE');
    }
  } else {
    console.log(file, '-> NOT FOUND (title:', html.match(/<title>(.*?)<\/title>/)?.[1], ')');
  }
}

async function run() {
  await checkWiki('Fontainebleau_Agreements.jpg');
  await checkWiki('Vietnam_France_modus_vivendi.JPG');
  await checkWiki('Hồ_Chí_Minh_tại_Kỳ_họp_thứ_nhất_Quốc_hội_khóa_I.jpg');
  await checkWiki('Hồ_Chí_Minh_và_Phạm_Văn_Đồng_tại_Paris.jpg');
  await checkWiki('Ho_Chi_Minh_1946.jpg');
  await checkWiki('Ho_Chi_Minh_and_Vo_Nguyen_Giap.jpg');
  await checkWiki('Uncle_Ho_with_children.jpg');
  await checkWiki('Bac_Ho_voi_thieu_nhi.jpg');
  await checkWiki('Ho_Chi_Minh_in_Pac_Bo.jpg');
  await checkWiki('Lenin_Park_Hanoi.jpg');
}
run();
