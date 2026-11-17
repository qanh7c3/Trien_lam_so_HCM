# QUY TẮC BẮT BUỘC CỦA DỰ ÁN TRIỂN LÃM SỐ CHỦ TỊCH HỒ CHÍ MINH

## 1. NGUYÊN TẮC TƯ LIỆU LỊCH SỬ (CHUẨN XÁC 100% - CẤM BỊA ĐẶT)
- TUYỆT ĐỐI KHÔNG tự sáng tác, suy diễn, viết lại lời nói, bịa đặt giai thoại, ngày tháng hoặc số liệu lịch sử.
- Mọi bài viết, mốc thời gian, câu chuyện và trích dẫn đều phải được kiểm chứng từ các nguồn chính thống của Việt Nam:
  1. Bảo tàng Hồ Chí Minh (baotanghochiminh.vn)
  2. Khu di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch (ditichhochiminhphuchutich.gov.vn)
  3. Cổng Thông tin điện tử Đảng Cộng sản Việt Nam - Tư liệu Văn kiện (tulieuvankien.dangcongsan.vn)
  4. Bộ sách "Hồ Chí Minh Toàn tập" và "Hồ Chí Minh Biên niên tiểu sử" (NXB Chính trị quốc gia Sự thật)
  5. Báo Nhân Dân (nhandan.vn) và Thông tấn xã Việt Nam (vnanet.vn)
- Mọi bản ghi lưu vào MongoDB BẮT BUỘC phải có 2 trường `source_name` (tên sách/cơ quan lưu trữ) và `source_url` (liên kết nguồn chính thống). Nếu một dữ liệu chưa xác minh được nguồn gốc rõ ràng, KHÔNG ĐƯỢC đưa vào cơ sở dữ liệu.
- Đối với hình ảnh tư liệu thật: Chỉ sử dụng đường dẫn ảnh hợp lệ lấy từ nguồn chính thống hoặc tải về lưu cục bộ trong `public/images/archive/` kèm chú thích đúng năm chụp và bối cảnh lịch sử. Cấm dùng ảnh AI tạo giả chân dung Bác hoặc dùng link ảnh chết.

## 2. TIÊU CHUẨN GIAO DIỆN, HIỆU ỨNG & HIỆU NĂNG ĐA THIẾT BỊ
- Phong cách thiết kế: Bảo tàng số / Triển lãm nghệ thuật đương đại (tông màu trang trọng: Đỏ son trầm, Vàng đồng, Nền giấy dó/kem ấm `#FAF6F0` và Tối sâu `#12100E`).
- Cân bằng hiệu ứng (60% thẩm mỹ & chuyển động nghệ thuật, 40% tối ưu mượt 60fps trên mọi thiết bị):
  - Sử dụng kết hợp **GSAP + ScrollTrigger** (cho Scrollytelling, hiệu ứng cuốn thư, bản đồ hành trình), **Motion (Framer Motion)** (cho chuyển trang, hiệu ứng mở chi tiết câu chuyện), và **Lenis** (cuộn mượt quán tính).
  - Chỉ animate các thuộc tính chạy trên GPU (`transform`, `opacity`, `clip-path`).
  - Dùng `gsap.matchMedia()` để tách cấu hình hiệu ứng: Desktop chạy đầy đủ hiệu ứng Parallax đa lớp, hiệu ứng chữ chạy theo cuộn và ánh sáng; Mobile tự động giảm tải độ phức tạp hạt/parallax và tôn trọng `prefers-reduced-motion` để không giật lag.

## 3. TIÊU CHUẨN MÃ NGUỒN
- Sử dụng Next.js (App Router), TypeScript, Tailwind CSS và Mongoose.
- Khi sinh mã nguồn, viết code sạch, rõ nghĩa, không chèn các dòng ghi chú giải thích thừa vào trong file code.
