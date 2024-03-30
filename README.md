# Online Exam Website
## Download
- JDK 21, Maven, Apache Tomcat, sau đó chạy trong cmd kiểm tra:
```bash
mvn --version
jdk --version
```
- NodeJS 
- Extension Postman trong VS code để check API
- [MongoDB Compass](https://downloads.mongodb.com/compass/mongodb-compass-1.42.3-win32-x64.exe)

## Technology
Java Spring Boot, NextJS, MongoDB, TailwindCSS, Ant Design

## Run
### FE/web

Khi mới clone về thì chạy lệnh sau để thêm node_modules cho project NextJS:
```bash
npm i
```

Sau đó chạy thử server:
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để xem.

### BE/web
- Vào MongoDB Compass, chọn New connection, paste link sau vào URI để kết nối database tạo trên MongoDB Atlas:
```bash
mongodb+srv://pvantien203:nhom16@cluster0.nkol2nn.mongodb.net/
```

- Save and Connect luôn để tiện sử dụng, database sử dụng là "quiz-ptit"
- Java thì chạy file trong main thôi, kiểm tra terminal hoặc dùng Postman kiểm tra API hoạt động chưa.

