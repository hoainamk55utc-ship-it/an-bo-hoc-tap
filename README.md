# 🐥 AN BƠ HỌC TẬP

Ứng dụng học tập cho bé 4–6 tuổi: học bảng chữ cái tiếng Việt, học số 0–100, luyện tập và chơi mini game, có phát âm tiếng Việt (text-to-speech), sao thưởng và huy hiệu.

Công nghệ: **React Native + Expo + TypeScript**, điều hướng bằng React Navigation, lưu thành tích bằng AsyncStorage, phát âm bằng `expo-speech`.

🌐 **Chơi trực tiếp trên web:** https://hoainamk55utc-ship-it.github.io/an-bo-hoc-tap/

---

## 1. Cài đặt

Yêu cầu: Node.js 18 trở lên.

```bash
cd "APP BƠ HỌC"
npm install
```

## 2. Chạy app trên máy tính (web)

```bash
npm run web
```

Mở trình duyệt tại `http://localhost:8081`.

## 3. Chạy trên điện thoại bằng Expo Go

1. Cài app **Expo Go** từ App Store (iPhone) hoặc Google Play (Android).
2. Máy tính và điện thoại phải **cùng mạng Wi-Fi**.
3. Chạy `npm start` rồi quét mã QR.

## 4. Build app cài đặt thật (APK / IPA)

Dùng EAS Build (miễn phí với tài khoản Expo):

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview   # file .apk
```

## 5. Triển khai web (tự động)

Mỗi lần đẩy code lên nhánh `main`, GitHub Actions tự build và deploy lên GitHub Pages (xem `.github/workflows/deploy.yml`).

## 6. Cấu trúc thư mục

```
src/
  navigation/   # Khai báo 13 màn hình (native stack)
  screens/      # Các màn hình + thư mục games/ (5 mini game)
  components/   # Nút, thẻ, thanh tiến độ, huy hiệu, màn trắc nghiệm
  data/         # alphabet.ts, numbers.ts, questions.ts
  utils/        # speech, storage, random, useQuiz
  styles/       # colors, global
```

## 7. Gợi ý mở rộng

- **Âm thanh thật**: thu âm giọng đọc chuẩn (.mp3) phát bằng `expo-av`.
- **Hình ảnh thật**: thay emoji bằng hình vẽ dễ thương.
- **Tài khoản phụ huynh**: khóa bằng phép tính, xem báo cáo học tập.
- **Cấp độ học**: dễ (0–10) → vừa (0–50) → khó (0–100).
- **Bài học tiếng Anh**: thêm ABC + từ vựng, mục mới ở trang chủ.
