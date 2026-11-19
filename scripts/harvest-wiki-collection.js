const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(process.cwd(), 'public', 'images', 'review');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const curatedItems = [
  {
    page: 'Nguyễn Sinh Sắc',
    filename: '01-nguyen-sinh-sac-than-phu.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Portrait_of_Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc.jpg/500px-Portrait_of_Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc.jpg?utm_source=vi.wikipedia.org',
    title: 'Chân dung cụ Phó bảng Nguyễn Sinh Sắc (1862–1929)',
    year: 'Trước 1929',
    category: 'Quê hương & Thân phụ Bác',
    location: 'Nam Đàn, Nghệ An / Đồng Tháp',
    context: 'Thân phụ của Chủ tịch Hồ Chí Minh, một nhà nho yêu nước, thương dân sâu sắc. Tấm gương của Người có ảnh hưởng quyết định đến nhân cách cao đẹp của Bác.'
  },
  {
    page: 'Trường Dục Thanh',
    filename: '02-truong-duc-thanh-phan-thiet.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Tr%C6%B0%E1%BB%9Dng_D%E1%BB%A5c_Thanh.jpg/600px-Tr%C6%B0%E1%BB%9Dng_D%E1%BB%A5c_Thanh.jpg?utm_source=vi.wikipedia.org',
    title: 'Di tích Trường Dục Thanh (Phan Thiết)',
    year: '1910 - 1911',
    category: 'Địa danh dấu chân Bác',
    location: 'Phan Thiết, Bình Thuận',
    context: 'Trường học do các sĩ phu yêu nước sáng lập hưởng ứng phong trào Duy Tân, nơi người thanh niên Nguyễn Tất Thành dừng chân dạy học trước khi vào Sài Gòn.'
  },
  {
    page: 'Bến Nhà Rồng',
    filename: '03-ben-nha-rong-saigon.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Ben_Nha_Rong.JPG/600px-Ben_Nha_Rong.JPG?utm_source=vi.wikipedia.org',
    title: 'Bến Nhà Rồng - Cảng Sài Gòn xưa',
    year: '1911',
    category: 'Địa danh dấu chân Bác',
    location: 'Bến cảng Sài Gòn (nay thuộc Quận 4, TP.HCM)',
    context: 'Nơi người thanh niên Văn Ba lên tàu Amiral Latouche-Tréville ngày 5/6/1911 bắt đầu cuộc hành trình 30 năm bôn ba tìm con đường giải phóng non sông.'
  },
  {
    page: 'Haymarket London',
    filename: '04-blue-plaque-carlton-hotel-london.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Blue_plaque_Ho_Chi_Minh%2C_Haymarket%2C_London.jpg/500px-Blue_plaque_Ho_Chi_Minh%2C_Haymarket%2C_London.jpg?utm_source=vi.wikipedia.org',
    title: 'Biển đồng tưởng niệm tại Khách sạn Carlton (Luân Đôn)',
    year: '1913 - 1917',
    category: 'Hành trình 5 Châu',
    location: 'Haymarket, Luân Đôn, Vương quốc Anh',
    context: 'Tấm biển lưu niệm chính thức tại London ghi nhận Nguyễn Tất Thành từng làm việc tại khách sạn Carlton nổi tiếng và tham gia phong trào công nhân quốc tế.'
  },
  {
    page: 'Ngõ Compoint Paris',
    filename: '05-nguyen-ai-quoc-ngo-compoint-paris.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Impasse_Compoint.JPG/600px-Impasse_Compoint.JPG?utm_source=vi.wikipedia.org',
    title: 'Ngôi nhà số 9 ngõ Compoint (Quận 17, Paris)',
    year: '1921 - 1923',
    category: 'Hành trình 5 Châu',
    location: 'Paris, Cộng hòa Pháp',
    context: 'Căn phòng trọ giản dị rộng chừng 9 mét vuông, nơi Nguyễn Ái Quốc sống, làm việc, viết bài cho báo Người Cùng Khổ (Le Paria) và sáng tác Bản án chế độ thực dân Pháp.'
  },
  {
    page: 'Đại hội Tours 1920',
    filename: '06-nguyen-ai-quoc-dai-hoi-tours-1920.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a2/Comrade_Nguyen_Ai_Quoc_at_the_national_congress_of_the_Socialist_Party_of_France_in_the_city_of_Tous%2C_France_in_December_1920.jpg/600px-Comrade_Nguyen_Ai_Quoc_at_the_national_congress_of_the_Socialist_Party_of_France_in_the_city_of_Tous%2C_France_in_December_1920.jpg?utm_source=vi.wikipedia.org',
    title: 'Nguyễn Ái Quốc phát biểu tại Đại hội Tours (Pháp)',
    year: '12/1920',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Thành phố Tours, Cộng hòa Pháp',
    context: 'Người thanh niên 30 tuổi Nguyễn Ái Quốc phát biểu dõng dạc trước 285 đại biểu, bỏ phiếu gia nhập Quốc tế III và sáng lập Đảng Cộng sản Pháp.'
  },
  {
    page: 'Thái Lan 1928',
    filename: '07-nha-luu-niem-nakhon-phanom-thailand.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/House_HoChiMinh_stayed%40NakhonPhanom.jpg/600px-House_HoChiMinh_stayed%40NakhonPhanom.jpg?utm_source=vi.wikipedia.org',
    title: 'Ngôi nhà Bác Hồ từng ở tại Nakhon Phanom (Thái Lan)',
    year: '1928 - 1929',
    category: 'Địa danh dấu chân Bác',
    location: 'Bản Mạy, tỉnh Nakhon Phanom, Thái Lan',
    context: 'Nơi Nguyễn Ái Quốc hoạt động cách mạng với bí danh Thầu Chín, hòa mình vào đời sống bà con kiều bào, mở trường dạy chữ Quốc ngữ và giác ngộ cách mạng.'
  },
  {
    page: 'Đường Kách mệnh 1927',
    filename: '08-duong-kach-menh-1927.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Duong_Kach_Menh_%28Original%29.jpg/500px-Duong_Kach_Menh_%28Original%29.jpg?utm_source=vi.wikipedia.org',
    title: 'Bản gốc cuốn sách \"Đường Kách mệnh\" (1927)',
    year: '1927',
    category: 'Bảo vật Quốc gia',
    location: 'Quảng Châu, Trung Quốc',
    context: 'Tác phẩm lý luận cách mạng kinh điển của Nguyễn Ái Quốc, tập hợp bài giảng lớp huấn luyện cán bộ cho Hội Việt Nam Cách mạng Thanh niên tại số 13 đường Văn Minh, Quảng Châu.'
  },
  {
    page: 'Pác Bó 1941',
    filename: '09-pac-bo-cao-bang-1941.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/P%C3%A1c_B%C3%B3.jpg/600px-P%C3%A1c_B%C3%B3.jpg?utm_source=vi.wikipedia.org',
    title: 'Di tích lịch sử Pác Bó (Hang Cốc Bó, Cao Bằng)',
    year: '1941',
    category: 'Địa danh dấu chân Bác',
    location: 'Xã Trường Hà, Hà Quảng, Cao Bằng',
    context: 'Nơi Bác Hồ đặt bước chân trở về Tổ quốc ngày 28/1/1941 sau đúng 30 năm bôn ba, sống và làm việc bên bàn đá chông chênh dịch sử Đảng.'
  },
  {
    page: 'Đình Tân Trào 1945',
    filename: '10-dinh-tan-trao-tuyen-quang.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/%C4%90%C3%ACnh_T%C3%A2n_Tr%C3%A0o.jpg/600px-%C4%90%C3%ACnh_T%C3%A2n_Tr%C3%A0o.jpg?utm_source=vi.wikipedia.org',
    title: 'Đình Tân Trào - Nơi họp Quốc dân Đại hội',
    year: 'Tháng 8/1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Sơn Dương, Tuyên Quang',
    context: 'Thủ đô Khu giải phóng: Nơi Bác Hồ chủ trì Quốc dân Đại hội (16–17/8/1945), thông qua Lệnh Tổng khởi nghĩa giành chính quyền trong cả nước.'
  },
  {
    page: 'Cây đa Tân Trào',
    filename: '11-cay-da-lich-su-tan-trao.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/11/C%C3%A2y_%C4%90a_l%E1%BB%8Bch_s%E1%BB%AD_T%C3%A2n_Tr%C3%A0o.JPG/600px-C%C3%A2y_%C4%90a_l%E1%BB%8Bch_s%E1%BB%AD_T%C3%A2n_Tr%C3%A0o.JPG?utm_source=vi.wikipedia.org',
    title: 'Cây đa lịch sử Tân Trào',
    year: '1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Tân Trào, Tuyên Quang',
    context: 'Dưới bóng cây đa lịch sử chiều ngày 16/8/1945, Việt Nam Giải phóng quân làm lễ xuất quân tiến về giải phóng thị xã Thái Nguyên, mở màn Tổng khởi nghĩa.'
  },
  {
    page: 'Đội Con Nai OSS 1945',
    filename: '12-bac-ho-oss-deer-team-1945.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Ho_Chi_Minh_%28third_from_left_standing%29_and_the_OSS_in_1945.jpg/600px-Ho_Chi_Minh_%28third_from_left_standing%29_and_the_OSS_in_1945.jpg?utm_source=vi.wikipedia.org',
    title: 'Bác Hồ và Phái bộ OSS (Mỹ) tại Tân Trào',
    year: 'Tháng 8/1945',
    category: 'Kháng chiến & Ngoại giao',
    location: 'Tân Trào, Tuyên Quang',
    context: 'Bác Hồ cùng đồng chí Võ Nguyên Giáp chụp ảnh chung với nhóm sĩ quan tình báo chiến lược Mỹ (Deer Team) tại chiến khu Tân Trào trước ngày Tổng khởi nghĩa.'
  },
  {
    page: 'Quảng trường Ba Đình 1945',
    filename: '13-quan-chung-ba-dinh-1945.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Ba_Dinh_Square_September_2nd%2C_1945.jpg/600px-Ba_Dinh_Square_September_2nd%2C_1945.jpg?utm_source=vi.wikipedia.org',
    title: 'Hơn 50 vạn đồng bào tại Quảng trường Ba Đình',
    year: '02/09/1945',
    category: 'Mốc son lập quốc',
    location: 'Quảng trường Ba Đình, Hà Nội',
    context: 'Biển người rợp cờ đỏ sao vàng trong ngày Lễ Độc lập thiêng liêng khi Chủ tịch Hồ Chí Minh long trọng tuyên bố nước Việt Nam Dân chủ Cộng hòa ra đời.'
  },
  {
    page: 'Bác Hồ và Bảo Đại 1945',
    filename: '14-bac-ho-va-bao-dai-1945.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Bao_Dai_and_Ho_Chi_Minh.jpg/500px-Bao_Dai_and_Ho_Chi_Minh.jpg?utm_source=vi.wikipedia.org',
    title: 'Chủ tịch Hồ Chí Minh và Cố vấn tối cao Vĩnh Thụy',
    year: 'Thu 1945',
    category: 'Đại đoàn kết toàn dân',
    location: 'Bắc Bộ Phủ, Hà Nội',
    context: 'Hình ảnh biểu tượng của tinh thần đại đoàn kết dân tộc: Chủ tịch Hồ Chí Minh đón tiếp cựu hoàng Bảo Đại (Cố vấn Vĩnh Thụy) tham gia chính quyền cách mạng.'
  },
  {
    page: 'Bắc Bộ Phủ',
    filename: '15-bac-bo-phu-ha-noi.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Bac_Bo_phu_01.JPG/600px-Bac_Bo_phu_01.JPG?utm_source=vi.wikipedia.org',
    title: 'Di tích lịch sử Bắc Bộ Phủ (Hà Nội)',
    year: '1945 - 1946',
    category: 'Địa danh dấu chân Bác',
    location: 'Số 12 Ngô Quyền, Hoàn Kiếm, Hà Nội',
    context: 'Trụ sở làm việc của Chủ tịch Hồ Chí Minh sau Cách mạng Tháng Tám, nơi Người tiếp đón các đoàn thể nhân dân, khách quốc tế và ký nhiều sắc lệnh lịch sử.'
  },
  {
    page: 'Hiệp định Sơ bộ 1946',
    filename: '16-hiep-dinh-so-bo-6-3-1946.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Ho%E2%80%93Sainteny_agreement%2C_March_6%2C_1946.jpg/600px-Ho%E2%80%93Sainteny_agreement%2C_March_6%2C_1946.jpg?utm_source=vi.wikipedia.org',
    title: 'Chủ tịch Hồ Chí Minh ký Hiệp định Sơ bộ 6/3/1946',
    year: '06/03/1946',
    category: 'Ngoại giao lịch sử',
    location: 'Số 38 Lý Thái Tổ, Hà Nội',
    context: 'Chủ trương đối ngoại tài tình \"Hòa để tiến\": Ký hiệp định hòa hoãn với Pháp để đuổi 20 vạn quân Tưởng về nước, tranh thủ thời gian củng cố lực lượng non trẻ.'
  },
  {
    page: 'Đàm phán Fontainebleau 1946',
    filename: '17-bac-ho-fontainebleau-paris-1946.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Ho_Chi_Minh_va_Phai_doan_du_Fontainebleau_1946.jpg/600px-Ho_Chi_Minh_va_Phai_doan_du_Fontainebleau_1946.jpg?utm_source=vi.wikipedia.org',
    title: 'Chủ tịch Hồ Chí Minh và Phái đoàn tại Fontainebleau (Pháp)',
    year: 'Tháng 7/1946',
    category: 'Ngoại giao lịch sử',
    location: 'Lâu đài Fontainebleau, Cộng hòa Pháp',
    context: 'Chủ tịch Hồ Chí Minh dẫn đầu phái đoàn Việt Nam sang Pháp đàm phán với tư cách thượng khách, kiên quyết bảo vệ nền độc lập và sự toàn vẹn lãnh thổ của Tổ quốc.'
  },
  {
    page: 'Quốc hội Khóa I 1946',
    filename: '18-bac-ho-dai-bieu-quoc-hoi-khoa-1-1946.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/H%E1%BB%93_Ch%C3%AD_Minh_v%C3%A0_%C4%91%E1%BA%A1i_bi%E1%BB%83u_qu%E1%BB%91c_h%E1%BB%99i_kho%C3%A1_1_VNDCCH%2C_1946.jpg/600px-H%E1%BB%93_Ch%C3%AD_Minh_v%C3%A0_%C4%91%E1%BA%A1i_bi%E1%BB%83u_qu%E1%BB%91c_h%E1%BB%99i_kho%C3%A1_1_VNDCCH%2C_1946.jpg?utm_source=vi.wikipedia.org',
    title: 'Chủ tịch Hồ Chí Minh cùng các đại biểu Quốc hội khóa I',
    year: 'Tháng 3/1946',
    category: 'Lịch sử Nhà nước',
    location: 'Nhà hát Lớn, Hà Nội',
    context: 'Quốc hội đầu tiên trong lịch sử dân tộc Việt Nam được bầu ra qua tổng tuyển cử dân chủ, bầu Hồ Chí Minh làm Chủ tịch Chính phủ Liên hiệp Kháng chiến.'
  },
  {
    page: 'Đại hội II của Đảng 1951',
    filename: '19-bac-ho-dai-hoi-2-1951.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Dai_hoi_Dai_bieu_toan_quoc_lan_thu_hai%2C_Dang_cong_san_VN.jpg/600px-Dai_hoi_Dai_bieu_toan_quoc_lan_thu_hai%2C_Dang_cong_san_VN.jpg?utm_source=vi.wikipedia.org',
    title: 'Bác Hồ tại Đại hội II của Đảng tại Chiến khu Việt Bắc',
    year: 'Tháng 2/1951',
    category: 'Lãnh đạo kháng chiến',
    location: 'Chiêm Hóa, Tuyên Quang',
    context: 'Đại hội kháng chiến toàn quốc lần thứ II quyết định đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam, định hướng thắng lợi cuộc kháng chiến chống Pháp.'
  },
  {
    page: 'Đời thường 1958',
    filename: '20-bac-ho-xem-bong-da-1958.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/President_Ho_Chi_Minh_watching_soccer_1958.jpg/500px-President_Ho_Chi_Minh_watching_soccer_1958.jpg?utm_source=vi.wikipedia.org',
    title: 'Chủ tịch Hồ Chí Minh theo dõi trận bóng đá quốc tế',
    year: '1958',
    category: 'Khoảnh khắc đời thường',
    location: 'Sân vận động Hàng Đẫy, Hà Nội',
    context: 'Hình ảnh đời thường thanh cao, gần gũi và giản dị của Chủ tịch Hồ Chí Minh khi hòa mình cùng nhân dân thủ đô theo dõi trận bóng đá hữu nghị.'
  },
  {
    page: 'Bác Hồ với thiếu nhi',
    filename: '21-bac-ho-voi-thieu-nhi.jpg',
    thumbUrl: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/Thieunhi4_52011.jpg/500px-Thieunhi4_52011.jpg?utm_source=vi.wikipedia.org',
    title: 'Bác Hồ và các cháu thiếu nhi Việt Nam',
    year: 'Thời kỳ kháng chiến',
    category: 'Khoảnh khắc đời thường',
    location: 'Chiến khu Việt Bắc',
    context: 'Tình cảm bao la, ấm áp như người cha già của Bác dành cho thế hệ măng non tương lai của non sông đất nước.'
  }
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log(`Bắt đầu tải ${curatedItems.length} bức ảnh tư liệu lịch sử qua Wikimedia CDN...`);
  const successList = [];

  for (let i = 0; i < curatedItems.length; i++) {
    const item = curatedItems[i];
    const outPath = path.join(targetDir, item.filename);

    console.log(`[${i + 1}/${curatedItems.length}] ${item.title}`);
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${item.thumbUrl}" -o "${outPath}"`;

    try {
      execSync(cmd);
      if (fs.existsSync(outPath)) {
        const stats = fs.statSync(outPath);
        if (stats.size > 5000) {
          console.log(`   ✓ Đã tải xong: ${(stats.size / 1024).toFixed(1)} KB -> ${item.filename}`);
          successList.push({
            ...item,
            file_size: stats.size,
            local_path: `/images/review/${item.filename}`
          });
        } else {
          console.warn(`   ⚠ Tệp nhỏ (${stats.size} bytes).`);
        }
      }
    } catch (err) {
      console.error(`   ✕ Lỗi: ${err.message}`);
    }

    await sleep(200);
  }

  // Ghi catalog.json
  fs.writeFileSync(path.join(targetDir, 'catalog.json'), JSON.stringify(successList, null, 2), 'utf-8');

  // Ghi file HTML xem trực quan
  const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bộ Sưu Tập 21 Ảnh Tư Liệu Lịch Sử - Chủ Tịch Hồ Chí Minh (Bản Duyệt)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #12100E; color: #EDE8DF; margin: 0; padding: 30px; }
    header { text-align: center; max-width: 900px; margin: 0 auto 40px; }
    h1 { color: #F3E5AB; font-family: Georgia, serif; font-size: 28px; margin-bottom: 8px; }
    p.lead { color: #C5A059; font-size: 14px; line-height: 1.6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; max-width: 1440px; margin: 0 auto; }
    .card { background: #1C1917; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s, border-color 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.4); }
    .card:hover { transform: translateY(-4px); border-color: #D4AF37; box-shadow: 0 10px 25px rgba(0,0,0,0.6); }
    .img-box { width: 100%; height: 280px; background: #000; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2); }
    .img-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .info { padding: 18px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .badge { display: inline-block; padding: 4px 10px; background: #FFF; color: #12100E; font-size: 11px; font-weight: bold; border-radius: 20px; margin-bottom: 10px; }
    .title { font-family: Georgia, serif; font-size: 17px; font-weight: bold; color: #FFF; margin-bottom: 8px; line-height: 1.3; }
    .meta { font-size: 12px; color: #D4AF37; margin-bottom: 8px; }
    .desc { font-size: 13px; color: #D1CBC2; line-height: 1.5; margin-bottom: 12px; }
    .source { font-size: 11px; color: #8F877F; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; }
    .filename { font-family: monospace; font-size: 11px; color: #F3E5AB; margin-top: 4px; }
  </style>
</head>
<body>
  <header>
    <h1>BỘ SƯU TẬP ẢNH TƯ LIỆU LỊCH SỬ CHỦ TỊCH HỒ CHÍ MINH</h1>
    <p class="lead">Đã tải về thành công ${successList.length} bức ảnh tư liệu quý, không trùng lặp về Bác Hồ, Quê hương và các Địa danh lịch sử thời xưa.<br>Lưu trữ cục bộ tại thư mục: <code>public/images/review/</code></p>
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
            <div class="meta"><strong>Năm:</strong> ${item.year} | <strong>Địa điểm:</strong> ${item.location}</div>
            <div class="desc">${item.context}</div>
          </div>
          <div class="source">
            <div><strong>Tệp lưu trữ:</strong> <span class="filename">${item.filename}</span> (${(item.file_size / 1024).toFixed(1)} KB)</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf-8');

  // Ghi file README.md
  let md = '# BỘ SƯU TẬP 21 BỨC ẢNH TƯ LIỆU LỊCH SỬ CHỦ TỊCH HỒ CHÍ MINH (BẢN DUYỆT)\n\n';
  md += `Tổng cộng: **${successList.length}** bức ảnh tư liệu lịch sử quý, không trùng lặp.\n`;
  md += 'Thư mục lưu trữ: `public/images/review/`\n\n';
  md += '| STT | Tên tệp | Tên ảnh tư liệu | Năm | Địa danh / Bối cảnh | Thể loại |\n';
  md += '|---|---|---|---|---|---|\n';
  successList.forEach((it, i) => {
    md += `| ${i + 1} | \`${it.filename}\` | ${it.title} | ${it.year} | ${it.location} | ${it.category} |\n`;
  });
  fs.writeFileSync(path.join(targetDir, 'README.md'), md, 'utf-8');

  console.log(`\nHoàn thành! Đã tải về thành công ${successList.length}/${curatedItems.length} bức ảnh.`);
}

main();
