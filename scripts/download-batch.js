const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.join(process.cwd(), 'public', 'images', 'review');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const photoData = [
  {
    filename: '01-nguyen-sinh-sac-portrait.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Portrait_of_Nguy%E1%BB%85n_Sinh_S%E1%BA%AFc.jpg',
    title: 'Chân dung cụ Phó bảng Nguyễn Sinh Sắc',
    year: 'Thời kỳ trước 1929',
    category: 'Quê hương & Gia đình',
    location: 'Nam Đàn, Nghệ An / Cao Lãnh, Đồng Tháp',
    source: 'Bảo tàng Lịch sử Quốc gia & Wikimedia Commons',
    description: 'Thân phụ của Chủ tịch Hồ Chí Minh, một nhà nho yêu nước thương dân, đỗ Phó bảng khoa thi Hội năm Tân Sửu 1901.'
  },
  {
    filename: '02-hoang-tru-nam-dan-que-ngoai.jpeg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/C%E1%BB%95ng_ch%C3%A0o_l%C3%A0ng_Ho%C3%A0ng_Tr%C3%B9_v%C3%A0_M%E1%BA%ADu_T%C3%A0i%2C_Nam_%C4%90%C3%A0n%2C_Ngh%E1%BB%87_An.jpeg',
    title: 'Làng Hoàng Trù (Quê ngoại Bác Hồ)',
    year: 'Di tích lịch sử',
    category: 'Quê hương & Địa danh',
    location: 'Xã Kim Liên, Nam Đàn, Nghệ An',
    source: 'Khu di tích Kim Liên & Wikimedia Commons',
    description: 'Nơi Chủ tịch Hồ Chí Minh cất tiếng khóc chào đời ngày 19 tháng 5 năm 1890 và sống những năm tháng ấu thơ ấm áp bên mẹ.'
  },
  {
    filename: '03-truong-duc-thanh-phan-thiet.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Tr%C6%B0%E1%BB%9Dng_D%E1%BB%A5c_Thanh.jpg',
    title: 'Trường Dục Thanh (Phan Thiết)',
    year: '1910 - 1911',
    category: 'Địa danh dấu chân Bác',
    location: 'Phan Thiết, Bình Thuận',
    source: 'Bảo tàng Hồ Chí Minh - Chi nhánh Bình Thuận & Wikimedia Commons',
    description: 'Ngôi trường do các sĩ phu yêu nước sáng lập, nơi người thanh niên Nguyễn Tất Thành dạy học môn Thể dục và chữ Quốc ngữ trước khi vào Sài Gòn.'
  },
  {
    filename: '04-ben-nha-rong-saigon.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Ben_Nha_Rong.JPG',
    title: 'Bến Nhà Rồng (Cảng Sài Gòn)',
    year: '1911',
    category: 'Địa danh dấu chân Bác',
    location: 'Quận 4, TP. Hồ Chí Minh',
    source: 'Bảo tàng Hồ Chí Minh - Chi nhánh TP.HCM & Wikimedia Commons',
    description: 'Nơi người thanh niên Văn Ba lên tàu Amiral Latouche-Tréville rời Tổ quốc ngày 5/6/1911 bắt đầu hành trình 30 năm cứu nước.'
  },
  {
    filename: '05-carlton-hotel-london-plaque.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Ho_Chi_Minh_1890-1969_founder_of_modern_Vietnam_worked_in_1913_at_the_Carlton_Hotel_which_stood_on_this_site.jpg',
    title: 'Biển đồng tưởng niệm tại Khách sạn Carlton (Luân Đôn)',
    year: '1913',
    category: 'Hành trình 5 Châu',
    location: 'Haymarket, Luân Đôn, Vương quốc Anh',
    source: 'Hội đồng Thành phố Westminster (London) & Wikimedia Commons',
    description: 'Tấm biển lưu niệm chính thức ghi nhận Chủ tịch Hồ Chí Minh từng làm việc tại khách sạn Carlton năm 1913 dưới sự hướng dẫn của vua bếp Auguste Escoffier.'
  },
  {
    filename: '06-nguyen-ai-quoc-tours-1920.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Comrade_Nguyen_Ai_Quoc_at_the_national_congress_of_the_Socialist_Party_of_France_in_the_city_of_Tous%2C_France_in_December_1920.jpg',
    title: 'Nguyễn Ái Quốc tại Đại hội Tours (Pháp)',
    year: '12/1920',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Thành phố Tours, Cộng hòa Pháp',
    source: 'Thư viện Quốc gia Pháp (BNF Gallica) & Bảo tàng Hồ Chí Minh',
    description: 'Nguyễn Ái Quốc phát biểu tại Đại hội toàn quốc lần thứ 18 Đảng Xã hội Pháp, bỏ phiếu tán thành Quốc tế III và trở thành một trong những người sáng lập Đảng Cộng sản Pháp.'
  },
  {
    filename: '07-nguyen-ai-quoc-lien-xo-1923.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Comrade_Nguyen_Ai_Quoc_in_the_Soviet_Union_in_1923.jpg',
    title: 'Nguyễn Ái Quốc tại Liên Xô',
    year: '1923',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Moskva, Liên Xô',
    source: 'Viện Lưu trữ Lịch sử Chính trị - Xã hội Quốc gia Nga (RGASPI) & Bảo tàng Hồ Chí Minh',
    description: 'Bức ảnh lịch sử chụp Nguyễn Ái Quốc khi Người lần đầu tiên đặt chân đến quê hương của Cách mạng Tháng Mười Nga vào mùa hè năm 1923.'
  },
  {
    filename: '08-nguyen-ai-quoc-quoc-te-cong-san-1924.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Comrade_Nguyen_Ai_Quoc_and_several_representatives_at_the_fifth_Communist_International_Congress.jpg',
    title: 'Nguyễn Ái Quốc tại Đại hội V Quốc tế Cộng sản',
    year: '1924',
    category: 'Hoạt động cách mạng quốc tế',
    location: 'Điện Kremlin, Moskva, Liên Xô',
    source: 'Viện Lưu trữ Lịch sử Chính trị - Xã hội Quốc gia Nga (RGASPI) & Bảo tàng Hồ Chí Minh',
    description: 'Nguyễn Ái Quốc cùng các đại biểu tham dự Đại hội lần thứ V của Quốc tế Cộng sản, đóng góp nhiều luận điểm sâu sắc về phong trào giải phóng dân tộc thuộc địa.'
  },
  {
    filename: '09-duong-kach-menh-original-1927.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Duong_Kach_Menh_%28Original%29.jpg',
    title: 'Bản gốc tác phẩm Đường Kách mệnh (Quảng Châu)',
    year: '1927',
    category: 'Tư liệu & Văn kiện',
    location: 'Quảng Châu, Trung Quốc',
    source: 'Bảo tàng Lịch sử Quốc gia (Bảo vật Quốc gia số 11)',
    description: 'Bảo vật quốc gia: Cuốn sách tập hợp các bài giảng của Nguyễn Ái Quốc cho lớp huấn luyện cán bộ cách mạng Việt Nam tại Quảng Châu, đặt nền móng lý luận cho Đảng.'
  },
  {
    filename: '10-pac-bo-cao-bang.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/P%C3%A1c_B%C3%B3.jpg',
    title: 'Khu di tích lịch sử Pác Bó',
    year: '1941',
    category: 'Địa danh dấu chân Bác',
    location: 'Hà Quảng, Cao Bằng',
    source: 'Khu di tích Quốc gia đặc biệt Pác Bó & Wikimedia Commons',
    description: 'Nơi Bác Hồ đặt bước chân đầu tiên trở về Tổ quốc sau 30 năm bôn ba (28/1/1941), trực tiếp lãnh đạo phong trào cách mạng Việt Nam.'
  },
  {
    filename: '11-dinh-tan-trao.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/%C4%90%C3%ACnh_T%C3%A2n_Tr%C3%A0o.jpg',
    title: 'Đình Tân Trào (Tuyên Quang)',
    year: '1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Sơn Dương, Tuyên Quang',
    source: 'Khu di tích Quốc gia đặc biệt Tân Trào & Wikimedia Commons',
    description: 'Nơi họp Quốc dân Đại hội ngày 16 và 17 tháng 8 năm 1945, nhất trí thông qua lệnh Tổng khởi nghĩa và bầu ra Ủy ban Dân tộc giải phóng do Bác làm Chủ tịch.'
  },
  {
    filename: '12-cay-da-tan-trao.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/C%C3%A2y_%C4%90a_l%E1%BB%8Bch_s%E1%BB%AD_T%C3%A2n_Tr%C3%A0o.JPG',
    title: 'Cây đa Tân Trào lịch sử',
    year: '1945',
    category: 'Địa danh dấu chân Bác',
    location: 'Sơn Dương, Tuyên Quang',
    source: 'Khu di tích Quốc gia đặc biệt Tân Trào & Wikimedia Commons',
    description: 'Nơi đồng chí Võ Nguyên Giáp thay mặt Ủy ban Khởi nghĩa đọc Quân lệnh số 1 làm lễ xuất quân tiến về giải phóng Thái Nguyên và Hà Nội chiều 16/8/1945.'
  },
  {
    filename: '13-bac-ho-oss-deer-team-1945.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Ho_Chi_Minh_%28third_from_left_standing%29_and_the_OSS_in_1945.jpg',
    title: 'Bác Hồ và Đội Con Nai (OSS Mỹ) tại Tân Trào',
    year: 'Tháng 8/1945',
    category: 'Tư liệu kháng chiến & Ngoại giao',
    location: 'Tân Trào, Tuyên Quang',
    source: 'Cục Lưu trữ Văn khố Quốc gia Hoa Kỳ (NARA) & Bảo tàng Lịch sử Quân sự Việt Nam',
    description: 'Bác Hồ cùng đồng chí Võ Nguyên Giáp chụp ảnh chung với phái bộ Con Nai (Cơ quan Tình báo Chiến lược Mỹ - tiền thân của CIA) cùng hợp tác chống phát xít Nhật.'
  },
  {
    filename: '14-quan-chung-ba-dinh-2-9-1945.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Ba_Dinh_Square_September_2nd%2C_1945.jpg',
    title: 'Quần chúng nhân dân tại Quảng trường Ba Đình',
    year: '02/09/1945',
    category: 'Mốc son lập quốc',
    location: 'Quảng trường Ba Đình, Hà Nội',
    source: 'Thông tấn xã Việt Nam & Bảo tàng Lịch sử Quốc gia',
    description: 'Biển người hơn 50 vạn nhân dân thủ đô và các vùng lân cận tụ hội tại Quảng trường Ba Đình lắng nghe Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập.'
  },
  {
    filename: '15-bac-ho-bao-dai-1945.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Bao_Dai_and_Ho_Chi_Minh.jpg',
    title: 'Chủ tịch Hồ Chí Minh và Cố vấn tối cao Vĩnh Thụy (Bảo Đại)',
    year: 'Thu 1945',
    category: 'Lịch sử Nhà nước',
    location: 'Bắc Bộ Phủ, Hà Nội',
    source: 'Trung tâm Lưu trữ Quốc gia III & Bảo tàng Hồ Chí Minh',
    description: 'Chủ tịch Hồ Chí Minh làm việc và trao đổi với cựu hoàng Bảo Đại (lúc này giữ chức Cố vấn tối cao của Chính phủ lâm thời nước Việt Nam Dân chủ Cộng hòa).'
  },
  {
    filename: '16-hiep-dinh-so-bo-6-3-1946.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Ho%E2%80%93Sainteny_agreement%2C_March_6%2C_1946.jpg',
    title: 'Ký kết Hiệp định Sơ bộ ngày 6/3/1946',
    year: '06/03/1946',
    category: 'Ngoại giao lịch sử',
    location: 'Số 38 Lý Thái Tổ, Hà Nội',
    source: 'Bảo tàng Lịch sử Quốc gia & Wikimedia Commons',
    description: 'Chủ tịch Hồ Chí Minh và Vũ Hồng Khanh ký bản Hiệp định Sơ bộ với đại diện Pháp Jean Sainteny nhằm tranh thủ thời gian hòa hoãn chuẩn bị kháng chiến lâu dài.'
  },
  {
    filename: '17-bac-bo-phu-ha-noi.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Bac_Bo_phu_01.JPG',
    title: 'Di tích lịch sử Bắc Bộ Phủ (Hà Nội)',
    year: '1945 - 1946',
    category: 'Địa danh dấu chân Bác',
    location: 'Số 12 Ngô Quyền, Hoàn Kiếm, Hà Nội',
    source: 'Ban Quản lý Di tích Bắc Bộ Phủ & Wikimedia Commons',
    description: 'Trụ sở làm việc của Chủ tịch Hồ Chí Minh và Chính phủ lâm thời trong những ngày tháng đầu tiên sau khi Cách mạng Tháng Tám thành công.'
  },
  {
    filename: '18-bac-ho-quoc-hoi-khoa-1-1946.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh_tan_gi%E1%BB%9D_h%E1%BB%8Dp_Qu%E1%BB%91c_h%E1%BB%99i_t%E1%BA%A1i_Nh%C3%A0_H%C3%A1t_L%E1%BB%9Bn_-_H%C3%A0_N%E1%BB%99i%2C_n%C4%83m_1946_%28Trung_t%C3%A2m_L%C6%B0u_tr%E1%BB%AF_qu%E1%BB%91c_gia_III%2C_M%E1%BB%A5c_l%E1%BB%A5c_T%C3%A0i_li%E1%BB%87u_%E1%BA%A3nh_A36%29.jpg',
    title: 'Bác Hồ tại kỳ họp Quốc hội khóa I (Nhà hát Lớn Hà Nội)',
    year: '1946',
    category: 'Lịch sử Nhà nước',
    location: 'Nhà hát Lớn, Hà Nội',
    source: 'Trung tâm Lưu trữ Quốc gia III (Mục lục Tài liệu ảnh A36)',
    description: 'Chủ tịch Hồ Chí Minh sau giờ họp Quốc hội khóa I của nước Việt Nam Dân chủ Cộng hòa, được lưu trữ tại Trung tâm Lưu trữ Quốc gia III.'
  },
  {
    filename: '19-bac-ho-ton-duc-thang-atk-1947.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Ch%E1%BB%A7_t%E1%BB%8Bch_H%E1%BB%93_Ch%C3%AD_Minh_trao_%C4%91%E1%BB%95i_c%C3%B4ng_vi%E1%BB%87c_v%E1%BB%9Bi_%C4%91%E1%BB%93ng_ch%C3%AD_T%C3%B4n_%C4%90%E1%BB%A9c_Th%E1%BA%AFng_v%C3%A0_Ho%C3%A0ng_Qu%E1%BB%91c_Vi%E1%BB%87t_t%E1%BA%A1i_An_to%C3%A0n_khu_n%C4%83m_1947.jpg',
    title: 'Bác Hồ và đồng chí Tôn Đức Thắng tại ATK Định Hóa',
    year: '1947',
    category: 'Chiến khu Việt Bắc',
    location: 'Định Hóa, Thái Nguyên',
    source: 'Thông tấn xã Việt Nam & Bảo tàng Lịch sử Quân sự Việt Nam',
    description: 'Chủ tịch Hồ Chí Minh trao đổi kế hoạch tác chiến và công tác kháng chiến với đồng chí Tôn Đức Thắng và đồng chí Hoàng Quốc Việt tại An toàn khu.'
  },
  {
    filename: '20-bac-ho-dai-hoi-2-1951.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Dai_hoi_Dai_bieu_toan_quoc_lan_thu_hai%2C_Dang_cong_san_VN.jpg',
    title: 'Bác Hồ tại Đại hội II của Đảng (Chiêm Hóa, Tuyên Quang)',
    year: '1951',
    category: 'Lãnh đạo kháng chiến',
    location: 'Chiêm Hóa, Tuyên Quang',
    source: 'Báo Nhân Dân & Cổng TTĐT Đảng Cộng sản Việt Nam',
    description: 'Đại hội Đại biểu toàn quốc lần thứ II của Đảng diễn ra tại chiến khu Việt Bắc, quyết định đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam.'
  },
  {
    filename: '21-bac-ho-xem-bong-da-1958.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/President_Ho_Chi_Minh_watching_soccer_1958.jpg',
    title: 'Chủ tịch Hồ Chí Minh trên khán đài xem bóng đá',
    year: '1958',
    category: 'Khoảnh khắc đời thường',
    location: 'Sân vận động Hàng Đẫy, Hà Nội',
    source: 'Thông tấn xã Việt Nam & Bảo tàng Hồ Chí Minh',
    description: 'Khoảnh khắc đời thường thanh cao, gần gũi của Bác Hồ khi theo dõi trận thi đấu bóng đá hữu nghị quốc tế giữa đội tuyển Việt Nam và đội bạn.'
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Downloading ' + photoData.length + ' historical review photos using curl...');
  const successList = [];

  for (let i = 0; i < photoData.length; i++) {
    const item = photoData[i];
    const outPath = path.join(targetDir, item.filename);

    console.log(`[${i + 1}/${photoData.length}] Downloading: ${item.filename}`);
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${item.url}" -o "${outPath}"`;

    try {
      execSync(cmd, { stdio: 'inherit' });
      if (fs.existsSync(outPath)) {
        const stats = fs.statSync(outPath);
        if (stats.size > 1000) {
          console.log(`  -> OK (${(stats.size / 1024).toFixed(1)} KB)`);
          successList.push({
            ...item,
            file_size: stats.size,
            local_path: `/images/review/${item.filename}`
          });
        } else {
          console.warn(`  -> File too small (${stats.size} bytes), possible rate limit.`);
        }
      }
    } catch (err) {
      console.error(`  -> Failed: ${err.message}`);
    }

    await sleep(600); // 600ms pause between downloads
  }

  // Write catalog.json
  fs.writeFileSync(path.join(targetDir, 'catalog.json'), JSON.stringify(successList, null, 2), 'utf-8');

  // Generate an elegant HTML Gallery viewer for the user
  const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Bộ Sưu Tập 21 Ảnh Tư Liệu Lịch Sử - Chủ Tịch Hồ Chí Minh (Bản Duyệt)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #12100E; color: #EDE8DF; margin: 0; padding: 30px; }
    h1 { color: #F3E5AB; font-family: Georgia, serif; text-align: center; margin-bottom: 8px; }
    p.lead { text-align: center; color: #C5A059; margin-bottom: 40px; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; max-width: 1400px; margin: 0 auto; }
    .card { background: #1C1917; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s; }
    .card:hover { transform: translateY(-4px); border-color: #D4AF37; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .img-box { width: 100%; height: 260px; background: #000; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .img-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .info { padding: 18px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .badge { display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.9); color: #12100E; font-size: 11px; font-weight: bold; border-radius: 20px; margin-bottom: 10px; }
    .title { font-family: Georgia, serif; font-size: 16px; font-weight: bold; color: #FFF; margin-bottom: 8px; }
    .meta { font-size: 12px; color: #D4AF37; margin-bottom: 6px; }
    .desc { font-size: 13px; color: #C4BEB5; line-height: 1.5; margin-bottom: 12px; }
    .source { font-size: 11px; color: #8F877F; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 8px; }
  </style>
</head>
<body>
  <h1>BỘ SƯU TẬP ẢNH TƯ LIỆU LỊCH SỬ CHỦ TỊCH HỒ CHÍ MINH</h1>
  <p.lead>21 Bức ảnh chân thực về Bác Hồ, Quê hương và các Địa danh lịch sử thời xưa (Lưu tại thư mục <code>public/images/review/</code>)</p>
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
            <div class="desc">${item.description}</div>
          </div>
          <div class="source"><strong>Nguồn lưu trữ:</strong> ${item.source}</div>
        </div>
      </div>
    `).join('')}
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf-8');

  // Generate Markdown summary
  let md = '# DANH MỤC 21 BỨC ẢNH TƯ LIỆU LỊCH SỬ CHỦ TỊCH HỒ CHÍ MINH (BẢN DUYỆT)\\n\\n';
  md += 'Toàn bộ ảnh đã được tải về lưu trữ cục bộ tại thư mục: `public/images/review/`\\n\\n';
  md += '| STT | Tên tệp | Tên ảnh tư liệu | Năm | Địa danh / Bối cảnh | Nguồn lưu trữ |\\n';
  md += '|---|---|---|---|---|---|\\n';
  successList.forEach((it, i) => {
    md += `| ${i + 1} | \`${it.filename}\` | ${it.title} | ${it.year} | ${it.location} | ${it.source} |\\n`;
  });
  fs.writeFileSync(path.join(targetDir, 'README.md'), md, 'utf-8');

  console.log(`\\nCompleted. Successfully saved ${successList.length} photos and generated review index.html!`);
}

run();
