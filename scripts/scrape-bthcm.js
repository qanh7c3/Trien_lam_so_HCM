const fs = require('fs');

async function getBTHCM() {
  try {
    const res = await fetch('https://baotanghochiminh.vn/thu-vien-anh.html').then(r => r.text());
    const re = /\/upload\/[^"'>\s]+\.(?:jpg|png|jpeg)/gi;
    const matches = res.match(re) || [];
    console.log('Found ' + matches.length + ' image paths:');
    const unique = Array.from(new Set(matches));
    unique.forEach(m => console.log('https://baotanghochiminh.vn' + m));
  } catch (err) {
    console.error(err.message);
  }
}
getBTHCM();
