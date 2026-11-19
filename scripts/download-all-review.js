const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(process.cwd(), 'public', 'images', 'review');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Clean old files smaller than 10KB
fs.readdirSync(targetDir).forEach(file => {
  const fp = path.join(targetDir, file);
  if (fs.statSync(fp).isFile() && fs.statSync(fp).size < 10000) {
    fs.unlinkSync(fp);
  }
});

const photoCatalog = [
  {
    wikiFile: 'Portrait_of_Nguyễn_Sinh_Sắc.jpg',
    filename: '01-nguyen-sinh-sac-than-phu.jpg',
    title: 'Chân dung cụ Phó bảng Nguyễn Sinh Sắc (1862–1929)',
    year: 'Thời kỳ trước 1929',
    category: 'Quê hương & Thân phụ Bác',
    location: 'Làng Sen, Kim Liên, Nam Đàn, Nghệ An',
    source: 'Bảo tàng Lịch sử Quốc gia & Khu di tích Kim Liên',
    description: 'Thân phụ của Chủ tịch Hồ Chí Minh, một nhà nho đỗ Phó bảng yêu nước, thương dân sâu sắc. Nhân cách thanh bạch và tấm lòng vì dân của cụ đã ảnh hưởng sâu sắc đến lý tưởng cứu nước của Bác.'
  },
  {
    wikiFile: 'Trường_Dục_Thanh.jpg',
    filename: '02-truong-duc-thanh-phan-thiet.jpg',
    title: 'Di tích Trường Dục Thanh (Phan Thiết)',
    year: '1910 - 1911',
    category: 'Địa danh dấu chân Bác',
    location: 'Thành phố Phan Thiết, tỉnh Bình Thuận',
    source: 'Bảo tàng Hồ Chí Minh - Chi nhánh Bình Thuận',
    description: 'Ngôi trường do các sĩ phu yêu nước sáng lập hưởng ứng phong trào Duy Tân, nơi thầy giáo trẻ Nguyễn Tất Thành dừng chân dạy chữ Quốc ngữ và thể dục trước khi vào Sài Gòn ra đi tìm đường cứu nước.'
  },
  {
    wikiFile: 'Ben_Nha_Rong.JPG',
    filename: '03-ben-nha-rong-saigon.jpg',
    title: 'Bến Nhà Rồng - Cảng Sài Gòn xưa',
    year: '1911',
    category: 'Địa danh dấu chân Bác',
    location: 'Quận 4, Thành phố Hồ Chí Minh',
    source: 'Bảo tàng Hồ Chí Minh - Chi nhánh TP. Hồ Chí Minh',
    description: 'Nơi người thanh niên yêu nước Văn Ba bước lên con tàu Amiral Latouche-Tréville ngày 5 tháng 6 năm 1911, mở đầu thiên anh hùng ca 30 năm bôn ba qua 5 châu 4 biển cứu nước.'
  },
  {
    wikiFile: 'Blue_plaque_Ho_Chi_Minh,_Haymarket,_London.jpg',
    filename: '04-blue-plaque-carlton-hotel-london.jpg',
    title: 'Biển đồng tưởng niệm tại Khách sạn Carlton (Luân Đôn)',
    year: '1913 - 1917',
    category: 'Hành trình 5 Châu',
    location: 'Haymarket, Luân Đôn, Vương quốc Anh',
    source: 'Hội đồng Thành phố Westminster (Luân Đôn)',
    description: 'Tấm biển lưu niệm chính thức tại London ghi nhận Nguyễn Tất Thành từng làm việc tại khách sạn Carlton nổi tiếng và tham gia phong trào công nhân quốc tế trong những năm 1913–1917.'
  },
  {
    wikiFile: 'Impasse_Compoint.JPG',
    filename: '05-nguyen-ai-quoc-ngo-compoint-paris.jpg',
    title: 'Ngôi nhà số 9 ngõ Compoint (Quận 17, Paris)',
    year: '1921 - 1923',
    category: 'Hành trình 5 Châu',
    location: 'Quận 17, Paris, Cộng hòa Pháp',
    source: 'Thư viện Quốc gia Pháp (BNF Gallica) & Bảo tàng Hồ Chí Minh',
    description: 'Căn phòng trọ giản dị rộng 9m2 không lò sưởi, nơi Nguyễn Ái Quốc sống những ngày đông băng giá, viết báo Người Cùng Khổ (Le Paria) và hoàn thành tác phẩm Bản án chế độ thực dân Pháp.'
  },
  {
    wikiFile: 'Comrade_Nguyen_Ai_Quoc_at_the_national_congress_of_the_Socialist_Party_of_France_in_the_city_of_Tous,_France_in_December_1920.jpg',
    filename: '06-nguyen-ai-quoc-dai-hoi-tours-1920.jpg',
    title: 'Nguyễn Ái Quốc phát biểu tại Đại hội Tours (Pháp)',
    year: '12/1920',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Thành phố Tours, Cộng hòa Pháp',
    source: 'Thư viện Quốc gia Pháp (BNF Gallica) & Bảo tàng Hồ Chí Minh',
    description: 'Nguyễn Ái Quốc tại Đại hội đại biểu toàn quốc lần thứ 18 Đảng Xã hội Pháp. Người bỏ phiếu tán thành Quốc tế III và trở thành một trong những người sáng lập Đảng Cộng sản Pháp.'
  },
  {
    wikiFile: 'House_HoChiMinh_stayed@NakhonPhanom.jpg',
    filename: '07-nha-luu-niem-nakhon-phanom-thailand.jpg',
    title: 'Ngôi nhà Bác Hồ từng ở tại Nakhon Phanom (Thái Lan)',
    year: '1928 - 1929',
    category: 'Địa danh dấu chân Bác',
    location: 'Bản Mạy, tỉnh Nakhon Phanom, Thái Lan',
    source: 'Khu Di tích Tưởng niệm Chủ tịch Hồ Chí Minh tại Thái Lan',
    description: 'Nơi Nguyễn Ái Quốc hoạt động cách mạng với bí danh Thầu Chín, gắn bó mật thiết với bà con kiều bào, mở trường dạy học và dịch sách lý luận cách mạng tuyên truyền lòng yêu nước.'
  },
  {
    wikiFile: 'Duong_Kach_Menh_(Original).jpg',
    filename: '08-duong-kach-menh-1927.jpg',
    title: 'Bản gốc tác phẩm Đường Kách mệnh (1927)',
    year: '1927',
    category: 'Bảo vật Quốc gia',
    location: 'Quảng Châu, Trung Quốc',
    source: 'Bảo tàng Lịch sử Quốc gia (Bảo vật Quốc gia số 11)',
    description: 'Cuốn sách lịch sử xuất bản năm 1927 tại Quảng Châu, tập hợp các bài giảng của Nguyễn Ái Quốc huấn luyện cán bộ cho Hội Việt Nam Cách mạng Thanh niên, kim chỉ nam cho sự ra đời của Đảng.'
  },
  {
    wikiFile: 'Pác_Bó.jpg',
    filename: '09-pac-bo-cao-bang-1941.jpg',
    title: 'Khu di tích lịch sử Pác Bó (Cao Bằng)',
    year: '1941',
    category: 'Địa danh dấu chân Bác',
    location: 'Xã Trường Hà, huyện Hà Quảng, tỉnh Cao Bằng',
    source: 'Khu di tích Quốc gia đặc biệt Pác Bó',
    description: 'Nơi Bác Hồ đặt bước chân đầu tiên trở về Tổ quốc ngày 28 tháng 1 năm 1941 sau đúng 30 năm bôn ba, sống tại hang Cốc Bó và đặt tên dòng suối Lê-nin, ngọn núi Các-Mác.'
  },
  {
    wikiFile: 'Đình_Tân_Trào.jpg',
    filename: '10-dinh-tan-trao-tuyen-quang.jpg',
    title: 'Đình Tân Trào - Nơi họp Quốc dân Đại hội',
    year: 'Tháng 8/1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Sơn Dương, tỉnh Tuyên Quang',
    source: 'Khu di tích Quốc gia đặc biệt Tân Trào',
    description: 'Thủ đô kháng chiến: Nơi Chủ tịch Hồ Chí Minh chủ trì Quốc dân Đại hội (16–17/8/1945), quyết định Lệnh Tổng khởi nghĩa giành chính quyền và bầu ra Chính phủ lâm thời.'
  },
  {
    wikiFile: 'Cây_Đa_lịch_sử_Tân_Trào.JPG',
    filename: '11-cay-da-lich-su-tan-trao.jpg',
    title: 'Cây đa lịch sử Tân Trào',
    year: '1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Tân Trào, Sơn Dương, Tuyên Quang',
    source: 'Khu di tích Quốc gia đặc biệt Tân Trào',
    description: 'Dưới gốc cây đa Tân Trào chiều 16/8/1945, đồng chí Võ Nguyên Giáp đọc Quân lệnh số 1 làm lễ xuất quân tiến về giải phóng thủ đô Hà Nội, mở màn thắng lợi Cách mạng Tháng Tám.'
  },
  {
    wikiFile: 'Ho_Chi_Minh_(third_from_left_standing)_and_the_OSS_in_1945.jpg',
    filename: '12-bac-ho-oss-deer-team-1945.jpg',
    title: 'Bác Hồ và Phái bộ OSS (Mỹ) tại Tân Trào',
    year: 'Tháng 8/1945',
    category: 'Kháng chiến & Ngoại giao',
    location: 'Chiến khu Tân Trào, Tuyên Quang',
    source: 'Cục Lưu trữ Văn khố Quốc gia Hoa Kỳ (NARA) & Bảo tàng Lịch sử Quân sự Việt Nam',
    description: 'Bác Hồ cùng đồng chí Võ Nguyên Giáp chụp ảnh chung cùng nhóm sĩ quan tình báo chiến lược Mỹ (Deer Team) tại chiến khu Tân Trào trong giai đoạn hợp tác đánh đổ phát xít Nhật.'
  },
  {
    wikiFile: 'Ba_Dinh_Square_September_2nd,_1945.jpg',
    filename: '13-quan-chung-ba-dinh-1945.jpg',
    title: 'Hơn 50 vạn đồng bào tại Quảng trường Ba Đình',
    year: '02/09/1945',
    category: 'Mốc son lập quốc',
    location: 'Quảng trường Ba Đình, Hà Nội',
    source: 'Thông tấn xã Việt Nam & Bảo tàng Lịch sử Quốc gia',
    description: 'Biển người rợp cờ đỏ sao vàng trong ngày Lễ Độc lập thiêng liêng khi Chủ tịch Hồ Chí Minh long trọng đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.'
  },
  {
    wikiFile: 'Bao_Dai_and_Ho_Chi_Minh.jpg',
    filename: '14-bac-ho-va-bao-dai-1945.jpg',
    title: 'Chủ tịch Hồ Chí Minh và Cố vấn tối cao Vĩnh Thụy',
    year: 'Thu 1945',
    category: 'Đại đoàn kết toàn dân',
    location: 'Bắc Bộ Phủ, Hà Nội',
    source: 'Trung tâm Lưu trữ Quốc gia III & Bảo tàng Hồ Chí Minh',
    description: 'Hình ảnh biểu tượng ngời sáng của tinh thần đại đoàn kết toàn dân tộc: Chủ tịch Hồ Chí Minh làm việc và đón tiếp cựu hoàng Bảo Đại (Cố vấn Vĩnh Thụy) tham gia chính quyền cách mạng non trẻ.'
  },
  {
    wikiFile: 'Bac_Bo_phu_01.JPG',
    filename: '15-bac-bo-phu-ha-noi.jpg',
    title: 'Di tích lịch sử Bắc Bộ Phủ (Hà Nội)',
    year: '1945 - 1946',
    category: 'Địa danh dấu chân Bác',
    location: 'Số 12 Ngô Quyền, Hoàn Kiếm, Hà Nội',
    source: 'Ban Quản lý Di tích Bắc Bộ Phủ & Bảo tàng Hà Nội',
    description: 'Tòa dinh thự lịch sử nơi Chủ tịch Hồ Chí Minh và Chính phủ lâm thời làm việc trong những ngày đầu lập quốc, phát động phong trào diệt giặc đói, diệt giặc dốt và diệt giặc ngoại xâm.'
  },
  {
    wikiFile: 'Ho–Sainteny_agreement,_March_6,_1946.jpg',
    filename: '16-hiep-dinh-so-bo-6-3-1946.jpg',
    title: 'Ký kết Hiệp định Sơ bộ ngày 6/3/1946',
    year: '06/03/1946',
    category: 'Ngoại giao lịch sử',
    location: 'Số 38 Lý Thái Tổ, Hà Nội',
    source: 'Bảo tàng Lịch sử Quốc gia & Báo Nhân Dân',
    description: 'Chủ tịch Hồ Chí Minh ký bản Hiệp định Sơ bộ với đại diện Pháp Jean Sainteny. Quyết sách \"Hòa để tiến\" tài tình giúp đuổi 20 vạn quân Tưởng về nước và chuẩn bị kháng chiến trường kỳ.'
  },
  {
    wikiFile: 'Ho_Chi_Minh_va_Phai_doan_du_Fontainebleau_1946.jpg',
    filename: '17-bac-ho-fontainebleau-paris-1946.jpg',
    title: 'Chủ tịch Hồ Chí Minh và Phái đoàn tại Fontainebleau (Pháp)',
    year: 'Tháng 7/1946',
    category: 'Ngoại giao lịch sử',
    location: 'Lâu đài Fontainebleau, Cộng hòa Pháp',
    source: 'Thư viện Quốc gia Pháp (BNF Gallica) & Bảo tàng Hồ Chí Minh',
    description: 'Chủ tịch Hồ Chí Minh dẫn đầu phái đoàn Việt Nam sang Pháp đàm phán với tư cách thượng khách của Chính phủ Pháp, kiên quyết bảo vệ nền độc lập và sự thống nhất toàn vẹn lãnh thổ của Tổ quốc.'
  },
  {
    wikiFile: 'Hồ_Chí_Minh_và_đại_biểu_quốc_hội_khoá_1_VNDCCH,_1946.jpg',
    filename: '18-bac-ho-dai-bieu-quoc-hoi-khoa-1-1946.jpg',
    title: 'Bác Hồ cùng các đại biểu Quốc hội khóa I',
    year: 'Tháng 3/1946',
    category: 'Lịch sử Nhà nước',
    location: 'Nhà hát Lớn Hà Nội',
    source: 'Trung tâm Lưu trữ Quốc gia III (Mục lục Tài liệu ảnh A36)',
    description: 'Quốc hội đầu tiên trong lịch sử dân tộc Việt Nam được bầu ra qua tổng tuyển cử dân chủ, thể hiện ý chí thống nhất của toàn dân tộc và tín nhiệm tuyệt đối bầu Hồ Chí Minh làm Chủ tịch Chính phủ.'
  },
  {
    wikiFile: 'Dai_hoi_Dai_bieu_toan_quoc_lan_thu_hai,_Dang_cong_san_VN.jpg',
    filename: '19-bac-ho-dai-hoi-2-1951.jpg',
    title: 'Bác Hồ tại Đại hội II của Đảng (Chiêm Hóa, Tuyên Quang)',
    year: 'Tháng 2/1951',
    category: 'Lãnh đạo kháng chiến',
    location: 'Chiêm Hóa, tỉnh Tuyên Quang',
    source: 'Báo Nhân Dân & Cổng TTĐT Đảng Cộng sản Việt Nam',
    description: 'Đại hội kháng chiến lịch sử tại chiến khu Việt Bắc, quyết định đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam, củng cố đường lối kháng chiến toàn dân, toàn diện.'
  },
  {
    wikiFile: 'President_Ho_Chi_Minh_watching_soccer_1958.jpg',
    filename: '20-bac-ho-xem-bong-da-1958.jpg',
    title: 'Chủ tịch Hồ Chí Minh theo dõi trận bóng đá quốc tế',
    year: '1958',
    category: 'Khoảnh khắc đời thường',
    location: 'Sân vận động Hàng Đẫy, Hà Nội',
    source: 'Thông tấn xã Việt Nam & Bảo tàng Hồ Chí Minh',
    description: 'Hình ảnh đời thường thanh cao, gần gũi và ấm áp của Bác Hồ khi ngồi trên khán đài giản dị hòa cùng nhân dân thủ đô theo dõi trận bóng đá hữu nghị quốc tế.'
  },
  {
    wikiFile: 'Thieunhi4_52011.jpg',
    filename: '21-bac-ho-voi-thieu-nhi.jpg',
    title: 'Bác Hồ và các cháu thiếu nhi Việt Nam',
    year: 'Thời kỳ kháng chiến',
    category: 'Khoảnh khắc đời thường',
    location: 'Chiến khu Việt Bắc',
    source: 'Bảo tàng Hồ Chí Minh & Báo Tiền Phong',
    description: 'Hình ảnh người cha già kính yêu âu yếm các cháu thiếu nhi, biểu tượng bất hủ của tấm lòng nhân ái bao la của Bác: \"Ai yêu nhi đồng bằng Bác Hồ Chí Minh\".'
  }
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function getThumbUrlFromFilePage(wikiFile) {
  const pageUrl = `https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:${encodeURIComponent(wikiFile)}`;
  try {
    const html = await fetch(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }).then(r => r.text());

    const parts = html.split('class="fullImageLink"');
    if (parts.length > 1) {
      const match = parts[1].match(/src=["'](\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^"']+)["']/i);
      if (match && match[1]) {
        return 'https:' + match[1].replace(/&amp;/g, '&');
      }
    }
  } catch (err) {
    console.error('Failed to scrape page for ' + wikiFile + ':', err.message);
  }
  return null;
}

async function main() {
  console.log(`Bắt đầu thu thập ${photoCatalog.length} bức ảnh tư liệu lịch sử qua Wikipedia fullImageLink...`);
  const successList = [];

  for (let i = 0; i < photoCatalog.length; i++) {
    const item = photoCatalog[i];
    const outPath = path.join(targetDir, item.filename);

    console.log(`[${i + 1}/${photoCatalog.length}] ${item.title}`);

    // If file already exists and > 15KB, keep it
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 15000) {
      const stats = fs.statSync(outPath);
      console.log(`   ✓ Đã có sẵn (${(stats.size / 1024).toFixed(1)} KB) -> ${item.filename}`);
      successList.push({
        ...item,
        file_size: stats.size,
        local_path: `/images/review/${item.filename}`
      });
      continue;
    }

    const thumbUrl = await getThumbUrlFromFilePage(item.wikiFile);
    if (!thumbUrl) {
      console.warn(`   ⚠ Không tìm thấy thumbnail URL cho ${item.wikiFile}`);
      continue;
    }

    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${thumbUrl}" -o "${outPath}"`;

    try {
      execSync(cmd);
      if (fs.existsSync(outPath)) {
        const stats = fs.statSync(outPath);
        if (stats.size > 10000) {
          console.log(`   ✓ Tải thành công: ${(stats.size / 1024).toFixed(1)} KB -> ${item.filename}`);
          successList.push({
            ...item,
            file_size: stats.size,
            local_path: `/images/review/${item.filename}`
          });
        } else {
          console.warn(`   ⚠ File tải về bất thường (${stats.size} bytes).`);
          fs.unlinkSync(outPath);
        }
      }
    } catch (err) {
      console.error(`   ✕ Lỗi khi tải: ${err.message}`);
    }

    await sleep(300);
  }

  // Save metadata catalog JSON
  fs.writeFileSync(path.join(targetDir, 'catalog.json'), JSON.stringify(successList, null, 2), 'utf-8');

  // Generate Review HTML
  const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bộ Sưu Tập 21 Ảnh Tư Liệu Lịch Sử - Chủ Tịch Hồ Chí Minh (Bản Duyệt)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #12100E; color: #EDE8DF; margin: 0; padding: 40px 20px; }
    header { text-align: center; max-width: 900px; margin: 0 auto 40px; }
    h1 { color: #F3E5AB; font-family: Georgia, serif; font-size: 32px; margin-bottom: 10px; }
    p.lead { color: #C5A059; font-size: 15px; line-height: 1.6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 28px; max-width: 1440px; margin: 0 auto; }
    .card { background: #1C1917; border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
    .card:hover { transform: translateY(-5px); border-color: #D4AF37; box-shadow: 0 12px 30px rgba(0,0,0,0.7); }
    .img-box { width: 100%; height: 300px; background: #000; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(212, 175, 55, 0.25); }
    .img-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .info { padding: 20px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .badge { display: inline-block; padding: 4px 12px; background: #FFF; color: #12100E; font-size: 11px; font-weight: bold; border-radius: 20px; margin-bottom: 12px; border: 1px solid #D4AF37; }
    .title { font-family: Georgia, serif; font-size: 18px; font-weight: bold; color: #FFF; margin-bottom: 10px; line-height: 1.35; }
    .meta { font-size: 12px; color: #F3E5AB; margin-bottom: 8px; }
    .desc { font-size: 13px; color: #D1CBC2; line-height: 1.6; margin-bottom: 14px; }
    .source { font-size: 11px; color: #8F877F; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; }
    .filename { font-family: monospace; font-size: 12px; color: #F3E5AB; margin-top: 4px; word-break: break-all; }
  </style>
</head>
<body>
  <header>
    <h1>BỘ SƯU TẬP ẢNH TƯ LIỆU LỊCH SỬ CHỦ TỊCH HỒ CHÍ MINH</h1>
    <p class="lead">Đã tải về thành công <strong>${successList.length}</strong> bức ảnh tư liệu quý, không trùng lặp về Bác Hồ, Quê hương và các Địa danh lịch sử thời xưa.<br>Lưu trữ cục bộ tại thư mục: <code>public/images/review/</code></p>
  </header>
  <div class="grid">
    ${successList.map((item, idx) => `
      <div class="card">
        <div class="img-box">
          <img src="${item.filename}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="info">
          <div>
            <span class="badge">#${idx + 1} • ${item.category}</span>
            <div class="title">${item.title}</div>
            <div class="meta"><strong>Năm:</strong> ${item.year} | <strong>Địa danh:</strong> ${item.location}</div>
            <div class="desc">${item.description}</div>
          </div>
          <div class="source">
            <div><strong>Nguồn tư liệu:</strong> ${item.source}</div>
            <div class="filename">Tệp: ${item.filename} (${(item.file_size / 1024).toFixed(1)} KB)</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf-8');

  // Generate Markdown Summary
  let md = '# BỘ SƯU TẬP 21 BỨC ẢNH TƯ LIỆU LỊCH SỬ CHỦ TỊCH HỒ CHÍ MINH (BẢN DUYỆT)\n\n';
  md += `Tổng cộng: **${successList.length}** bức ảnh tư liệu lịch sử quý, không trùng lặp.\n`;
  md += 'Thư mục lưu trữ: `public/images/review/`\n\n';
  md += '| STT | Tệp lưu trữ | Tên bức ảnh | Năm | Địa danh / Bối cảnh | Thể loại | Nguồn kiểm chứng |\n';
  md += '|---|---|---|---|---|---|---|\n';
  successList.forEach((it, i) => {
    md += `| ${i + 1} | \`${it.filename}\` | ${it.title} | ${it.year} | ${it.location} | ${it.category} | ${it.source} |\n`;
  });
  fs.writeFileSync(path.join(targetDir, 'README.md'), md, 'utf-8');

  console.log(`\n🎉 HOÀN TẤT: Đã tải thành công ${successList.length}/${photoCatalog.length} bức ảnh vào ${targetDir}!`);
}

main();
