# HƯỚNG DẪN KHÔI PHỤC BẢN SAO LƯU (BACKUP & RESTORE GUIDE)

**Phiên bản**: v1.0.0  
**Ngày sao lưu**: 17/11/2026  
**Trang web đang chạy trực tiếp**: https://trien-lam-ho-chi-minh.vercel.app  

---

## 1. CÁC TÀI LIỆU SAO LƯU HIỆN CÓ

1. **File nén mã nguồn đầy đủ**:
   - Đường dẫn: `backup/ho-chi-minh-memorial-v1.0.0.zip` (dung lượng ~2.4MB gồm toàn bộ mã nguồn, các ảnh tư liệu lịch sử, cấu hình và kịch bản).
2. **File sao lưu toàn bộ dữ liệu MongoDB**:
   - Đường dẫn: `backup/database-backup.json` (chứa toàn bộ 100% dữ liệu đã xác thực của 4 collections: `real_photos`, `five_continents_journey`, `stories_and_milestones`, `resistance_history`).
3. **Nhãn Git (Git Tag & Branch)**:
   - Git Tag: `v1.0.0`
   - Git Branch: `backup-v1.0.0`

---

## 2. HƯỚNG DẪN KHÔI PHỤC KHI CẦN

### Cách 1: Khôi phục nhanh bằng Git
Nếu bạn đang làm việc trên thư mục dự án và muốn quay về đúng trạng thái phiên bản này:
```bash
git checkout backup-v1.0.0
# hoặc
git checkout tags/v1.0.0
```

### Cách 2: Khôi phục từ file ZIP
1. Giải nén file `backup/ho-chi-minh-memorial-v1.0.0.zip` sang một thư mục mới.
2. Mở terminal tại thư mục đó và cài đặt lại thư viện:
   ```bash
   npm install
   ```
3. Khởi chạy ứng dụng:
   ```bash
   npm run dev
   # hoặc build sản phẩm
   npm run build && npm start
   ```

### Cách 3: Khôi phục dữ liệu vào cơ sở dữ liệu MongoDB
Khi bạn muốn đẩy lại toàn bộ dữ liệu lịch sử vào một database MongoDB mới:
1. Đặt biến môi trường `MONGODB_URI` (trong file `.env.local` hoặc terminal):
   ```bash
   $env:MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/ho_chi_minh_memorial"
   ```
2. Chạy lệnh khôi phục tự động:
   ```bash
   npm run db:restore
   ```
   Lệnh sẽ tự động nạp lại chính xác 4 collections dữ liệu lịch sử chuẩn xác 100%.

---

## 3. TRIỂN KHAI LẠI LÊN VERCEL KHI CẦN
Chỉ cần chạy lệnh:
```bash
npx vercel deploy --prod --yes
```
Hệ thống sẽ cập nhật ngay lập tức bản sao lưu này lên đường link `https://trien-lam-ho-chi-minh.vercel.app`.
