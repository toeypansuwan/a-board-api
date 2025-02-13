# Getting Started

## Installation

1. ติดตั้ง dependencies:

   ```sh
   yarn
   ```

2. คัดลอกไฟล์ `.env.example` และเปลี่ยนชื่อเป็น `.env`:

   ```sh
   cp .env.example .env
   ```

3. รัน Docker เพื่อเริ่มต้นบริการที่จำเป็น:

   ```sh
   docker-compose up -d
   ```

4. รัน migration เพื่อสร้างตารางในฐานข้อมูล:

   ```sh
   yarn migrate
   ```

5. รัน seed เพื่อเพิ่มข้อมูลเริ่มต้นในฐานข้อมูล:

   ```sh
   yarn seed
   ```

6. เริ่มเซิร์ฟเวอร์ในโหมดพัฒนา:
   ```sh
   yarn start:dev
   ```
