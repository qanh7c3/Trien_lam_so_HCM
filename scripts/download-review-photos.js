const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'public', 'images', 'review');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const photoList = [
  {
    filename: '01-nguyen-sinh-sac-portrait.jpg',
    wikiTitle: 'File:Portrait of Nguyễn Sinh Sắc.jpg',
    title: 'Chân dung cụ Phó bảng Nguyễn Sinh Sắc',
    year: 'Thời kỳ trước 1929',
    category: 'Quê hương & Gia đình',
    location: 'Nam Đàn, Nghệ An / Cao Lãnh, Đồng Tháp',
    description: 'Thân phụ của Chủ tịch Hồ Chí Minh, một nhà nho yêu nước thương dân, đỗ Phó bảng khoa thi Hội năm Tân Sửu 1901.'
  },
  {
    filename: '02-hoang-tru-nam-dan-que-ngoai.jpeg',
    wikiTitle: 'File:Cổng chào làng Hoàng Trù và Mậu Tài, Nam Đàn, Nghệ An.jpeg',
    title: 'Làng Hoàng Trù (Quê ngoại Bác Hồ)',
    year: 'Di tích lịch sử',
    category: 'Quê hương & Địa danh',
    location: 'Xã Kim Liên, Nam Đàn, Nghệ An',
    description: 'Nơi Chủ tịch Hồ Chí Minh cất tiếng khóc chào đời ngày 19 tháng 5 năm 1890 và sống những năm tháng ấu thơ ấm áp bên mẹ.'
  },
  {
    filename: '03-truong-duc-thanh-phan-thiet.jpg',
    wikiTitle: 'File:Trường Dục Thanh.jpg',
    title: 'Trường Dục Thanh (Phan Thiết)',
    year: '1910 - 1911',
    category: 'Địa danh dấu chân Bác',
    location: 'Phan Thiết, Bình Thuận',
    description: 'Ngôi trường do các sĩ phu yêu nước sáng lập, nơi người thanh niên Nguyễn Tất Thành dạy học môn Thể dục và chữ Quốc ngữ trước khi vào Sài Gòn.'
  },
  {
    filename: '04-ben-nha-rong-saigon.jpg',
    wikiTitle: 'File:Ben Nha Rong.JPG',
    title: 'Bến Nhà Rồng (Cảng Sài Gòn)',
    year: '1911',
    category: 'Địa danh dấu chân Bác',
    location: 'TP. Hồ Chí Minh',
    description: 'Nơi người thanh niên Văn Ba lên tàu Amiral Latouche-Tréville rời Tổ quốc ngày 5/6/1911 bắt đầu hành trình 30 năm cứu nước.'
  },
  {
    filename: '05-carlton-hotel-london-plaque.jpg',
    wikiTitle: 'File:Ho Chi Minh 1890-1969 founder of modern Vietnam worked in 1913 at the Carlton Hotel which stood on this site.jpg',
    title: 'Biển đồng tưởng niệm tại Khách sạn Carlton (Luân Đôn)',
    year: '1913',
    category: 'Hành trình 5 Châu',
    location: 'Haymarket, Luân Đôn, Vương quốc Anh',
    description: 'Tấm biển lưu niệm chính thức ghi nhận Chủ tịch Hồ Chí Minh từng làm việc tại khách sạn Carlton năm 1913 dưới sự hướng dẫn của vua bếp Auguste Escoffier.'
  },
  {
    filename: '06-nguyen-ai-quoc-tours-1920.jpg',
    wikiTitle: 'File:Comrade Nguyen Ai Quoc at the national congress of the Socialist Party of France in the city of Tous, France in December 1920.jpg',
    title: 'Nguyễn Ái Quốc tại Đại hội Tours (Pháp)',
    year: '12/1920',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Thành phố Tours, Cộng hòa Pháp',
    description: 'Nguyễn Ái Quốc phát biểu tại Đại hội toàn quốc lần thứ 18 Đảng Xã hội Pháp, bỏ phiếu tán thành Quốc tế III và trở thành một trong những người sáng lập Đảng Cộng sản Pháp.'
  },
  {
    filename: '07-nguyen-ai-quoc-lien-xo-1923.jpg',
    wikiTitle: 'File:Comrade Nguyen Ai Quoc in the Soviet Union in 1923.jpg',
    title: 'Nguyễn Ái Quốc tại Liên Xô',
    year: '1923',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Moskva, Liên Xô',
    description: 'Bức ảnh lịch sử chụp Nguyễn Ái Quốc khi Người lần đầu tiên đặt chân đến quê hương của Cách mạng Tháng Mười Nga vào mùa hè năm 1923.'
  },
  {
    filename: '08-nguyen-ai-quoc-quoc-te-cong-san-1924.jpg',
    wikiTitle: 'File:Comrade Nguyen Ai Quoc and several representatives at the fifth Communist International Congress.jpg',
    title: 'Nguyễn Ái Quốc tại Đại hội V Quốc tế Cộng sản',
    year: '1924',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Điện Kremlin, Moskva, Liên Xô',
    description: 'Nguyễn Ái Quốc cùng các đại biểu tham dự Đại hội lần thứ V của Quốc tế Cộng sản, đóng góp nhiều luận điểm sâu sắc về phong trào giải phóng dân tộc thuộc địa.'
  },
  {
    filename: '09-duong-kach-menh-original-1927.jpg',
    wikiTitle: 'File:Duong Kach Menh (Original).jpg',
    title: 'Bản gốc tác phẩm Đường Kách mệnh (Quảng Châu)',
    year: '1927',
    category: 'Tư liệu & Văn kiện',
    location: 'Quảng Châu, Trung Quốc',
    description: 'Bảo vật quốc gia: Cuốn sách tập hợp các bài giảng của Nguyễn Ái Quốc cho lớp huấn luyện cán bộ cách mạng Việt Nam tại Quảng Châu, đặt nền móng lý luận cho Đảng.'
  },
  {
    filename: '10-pac-bo-cao-bang.jpg',
    wikiTitle: 'File:Pác Bó.jpg',
    title: 'Khu di tích lịch sử Pác Bó',
    year: '1941',
    category: 'Địa danh dấu chân Bác',
    location: 'Hà Quảng, Cao Bằng',
    description: 'Nơi Bác Hồ đặt bước chân đầu tiên trở về Tổ quốc sau 30 năm bôn ba (28/1/1941), trực tiếp lãnh đạo phong trào cách mạng Việt Nam.'
  },
  {
    filename: '11-dinh-tan-trao.jpg',
    wikiTitle: 'File:Đình Tân Trào.jpg',
    title: 'Đình Tân Trào (Tuyên Quang)',
    year: '1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Sơn Dương, Tuyên Quang',
    description: 'Nơi họp Quốc dân Đại hội ngày 16 và 17 tháng 8 năm 1945, nhất trí thông qua lệnh Tổng khởi nghĩa và bầu ra Ủy ban Dân tộc giải phóng do Bác làm Chủ tịch.'
  },
  {
    filename: '12-cay-da-tan-trao.jpg',
    wikiTitle: 'File:Cây Đa lịch sử Tân Trào.JPG',
    title: 'Cây đa Tân Trào lịch sử',
    year: '1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Sơn Dương, Tuyên Quang',
    description: 'Nơi đồng chí Võ Nguyên Giáp thay mặt Ủy ban Khởi nghĩa đọc Quân lệnh số 1 làm lễ xuất quân tiến về giải phóng Thái Nguyên và Hà Nội chiều 16/8/1945.'
  },
  {
    filename: '13-bac-ho-oss-deer-team-1945.jpg',
    wikiTitle: 'File:Ho Chi Minh (third from left standing) and the OSS in 1945.jpg',
    title: 'Bác Hồ và Đội Con Nai (OSS Mỹ) tại Tân Trào',
    year: 'Tháng 8/1945',
    category: 'Tư liệu kháng chiến & Ngoại giao',
    location: 'Tân Trào, Tuyên Quang',
    description: 'Bác Hồ cùng đồng chí Võ Nguyên Giáp chụp ảnh chung với phái bộ Con Nai (Cơ quan Tình báo Chiến lược Mỹ - tiền thân của CIA) cùng hợp tác chống phát xít Nhật.'
  },
  {
    filename: '14-quan-chung-ba-dinh-2-9-1945.jpg',
    wikiTitle: 'File:Ba Dinh Square September 2nd, 1945.jpg',
    title: 'Quần chúng nhân dân tại Quảng trường Ba Đình',
    year: '02/09/1945',
    category: 'Mốc son lập quốc',
    location: 'Quảng trường Ba Đình, Hà Nội',
    description: 'Biển người hơn 50 vạn nhân dân thủ đô và các vùng lân cận tụ hội tại Quảng trường Ba Đình lắng nghe Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập.'
  },
  {
    filename: '15-bac-ho-bao-dai-1945.jpg',
    wikiTitle: 'File:Bao Dai and Ho Chi Minh.jpg',
    title: 'Chủ tịch Hồ Chí Minh và Cố vấn tối cao Vĩnh Thụy (Bảo Đại)',
    year: 'Thu 1945',
    category: 'Lịch sử Nhà nước',
    location: 'Bắc Bộ Phủ, Hà Nội',
    description: 'Chủ tịch Hồ Chí Minh làm việc và trao đổi với cựu hoàng Bảo Đại (lúc này giữ chức Cố vấn tối cao của Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa).'
  },
  {
    filename: '16-hiep-dinh-so-bo-6-3-1946.jpg',
    wikiTitle: 'File:Ho–Sainteny agreement, March 6, 1946.jpg',
    title: 'Ký kết Hiệp định Sơ bộ ngày 6/3/1946',
    year: '06/03/1946',
    category: 'Ngoại giao lịch sử',
    location: 'Số 38 Lý Thái Tổ, Hà Nội',
    description: 'Chủ tịch Hồ Chí Minh và Vũ Hồng Khanh ký bản Hiệp định Sơ bộ với đại diện Pháp Jean Sainteny nhằm tranh thủ thời gian hòa hoãn chuẩn bị kháng chiến lâu dài.'
  },
  {
    filename: '17-bac-bo-phu-ha-noi.jpg',
    wikiTitle: 'File:Bac Bo phu 01.JPG',
    title: 'Di tích lịch sử Bắc Bộ Phủ (Hà Nội)',
    year: '1945 - 1946',
    category: 'Địa danh dấu chân Bác',
    location: 'Số 12 Ngô Quyền, Hoàn Kiếm, Hà Nội',
    description: 'Trụ sở làm việc của Chủ tịch Hồ Chí Minh và Chính phủ lâm thời trong những ngày tháng đầu tiên sau khi Cách mạng Tháng Tám thành công.'
  },
  {
    filename: '18-bac-ho-quoc-hoi-khoa-1-1946.jpg',
    wikiTitle: 'File:Chủ tịch Hồ Chí Minh tan giờ họp Quốc hội tại Nhà Hát Lớn - Hà Nội, năm 1946 (Trung tâm Lưu trữ quốc gia III, Mục lục Tài liệu ảnh A36).jpg',
    title: 'Bác Hồ tại kỳ họp Quốc hội khóa I (Nhà hát Lớn Hà Nội)',
    year: '1946',
    category: 'Lịch sử Nhà nước',
    location: 'Nhà hát Lớn, Hà Nội',
    description: 'Chủ tịch Hồ Chí Minh sau giờ họp Quốc hội khóa I của nước Việt Nam Dân chủ Cộng hòa, được lưu trữ tại Trung tâm Lưu trữ Quốc gia III.'
  },
  {
    filename: '19-bac-ho-ton-duc-thang-atk-1947.jpg',
    wikiTitle: 'File:Chủ tịch Hồ Chí Minh trao đổi công việc với đồng chí Tôn Đức Thắng và Hoàng Quốc Việt tại An toàn khu năm 1947.jpg',
    title: 'Bác Hồ và đồng chí Tôn Đức Thắng tại ATK Định Hóa',
    year: '1947',
    category: 'Chiến khu Việt Bắc',
    location: 'Định Hóa, Thái Nguyên',
    description: 'Chủ tịch Hồ Chí Minh trao đổi kế hoạch tác chiến và công tác kháng chiến với đồng chí Tôn Đức Thắng và đồng chí Hoàng Quốc Việt tại An toàn khu.'
  },
  {
    filename: '20-bac-ho-dai-hoi-2-1951.jpg',
    wikiTitle: 'File:Dai hoi Dai bieu toan quoc lan thu hai, Dang cong san VN.jpg',
    title: 'Bác Hồ tại Đại hội II của Đảng (Chiêm Hóa, Tuyên Quang)',
    year: '1951',
    category: 'Lãnh đạo kháng chiến',
    location: 'Chiêm Hóa, Tuyên Quang',
    description: 'Đại hội Đại biểu toàn quốc lần thứ II của Đảng diễn ra tại chiến khu Việt Bắc, quyết định đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam.'
  },
  {
    filename: '21-bac-ho-xem-bong-da-1958.jpg',
    wikiTitle: 'File:President Ho Chi Minh watching soccer 1958.jpg',
    title: 'Chủ tịch Hồ Chí Minh trên khán đài xem bóng đá',
    year: '1958',
    category: 'Khoảnh khắc đời thường',
    location: 'Sân vận động Hàng Đẫy, Hà Nội',
    description: 'Khoảnh khắc đời thường thanh cao, gần gũi của Bác Hồ khi theo dõi trận thi đấu bóng đá hữu nghị quốc tế giữa đội tuyển Việt Nam và đội bạn.'
  }
];

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchImageUrl(wikiTitle) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(wikiTitle) + '&prop=imageinfo&iiprop=url&format=json';
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HCMResearchArchive/1.0 (educational memorial project)' }
  }).then(r => r.json());
  if (!res.query || !res.query.pages) return null;
  const page = Object.values(res.query.pages)[0];
  if (!page || !page.imageinfo || !page.imageinfo[0]) return null;
  return page.imageinfo[0].url;
}

async function downloadFile(fileUrl, outputPath) {
  const res = await fetch(fileUrl, {
    headers: { 'User-Agent': 'HCMResearchArchive/1.0 (educational memorial project)' }
  });
  if (!res.ok) throw new Error('Failed to fetch ' + fileUrl + ': ' + res.status);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  return buffer.length;
}

async function main() {
  console.log('Downloading ' + photoList.length + ' historical photos to public/images/review/ ...');
  const results = [];

  for (let i = 0; i < photoList.length; i++) {
    const item = photoList[i];
    const dest = path.join(targetDir, item.filename);
    console.log('[' + (i + 1) + '/' + photoList.length + '] ' + item.title);
    try {
      const imgUrl = await fetchImageUrl(item.wikiTitle);
      if (!imgUrl) {
        console.warn('  No image URL found for: ' + item.wikiTitle);
        continue;
      }
      const size = await downloadFile(imgUrl, dest);
      console.log('  Downloaded: ' + (size / 1024).toFixed(1) + ' KB -> ' + item.filename);
      results.push({ ...item, size, localPath: '/images/review/' + item.filename, sourceUrl: imgUrl });
    } catch (err) {
      console.error('  Error downloading ' + item.filename + ':', err.message);
    }
    await sleep(400);
  }

  // Write catalog metadata JSON
  const catalogPath = path.join(targetDir, 'catalog.json');
  fs.writeFileSync(catalogPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log('Saved catalog metadata to ' + catalogPath);
  console.log('Finished. Successfully downloaded ' + results.length + ' photos.');
}

main();
