# Docker Learn

Website tài liệu tiếng Việt để học Docker từ kiến thức container nền tảng đến xây dựng image, networking, storage, security, CI/CD và vận hành production.

Dự án dùng [Next.js](https://nextjs.org/) và [Fumadocs](https://fumadocs.dev/) với static export. Bộ khung hiện có **261 trang placeholder trong 22 nhóm chủ đề**; mỗi trang đã có frontmatter hợp lệ và sẵn sàng để bổ sung nội dung.

## Yêu cầu

- Node.js 20.9 trở lên
- npm đi kèm Node.js

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem trang chủ hoặc [http://localhost:3000/docs/](http://localhost:3000/docs/) để mở tài liệu.

## Kiểm tra dự án

```bash
npm run lint
npm run types:check
npm run build
```

Sau khi build, static site nằm trong thư mục `out/`. Có thể xem bản build bằng:

```bash
npm run preview
```

## Cấu trúc chính

```text
content/docs/          Nội dung và navigation metadata
src/app/               Next.js App Router
src/components/        MDX, search và provider components
src/lib/               Content source và layout config
source.config.ts       Fumadocs MDX config
next.config.mjs        Next.js static export config
wrangler.toml          Cloudflare Pages config
```

Mỗi thư mục trong `content/docs/` có một `meta.json` quyết định tên nhóm và thứ tự trang. Root `content/docs/meta.json` quyết định thứ tự toàn bộ curriculum.

## Thêm nội dung vào placeholder

Giữ nguyên frontmatter và viết nội dung bên dưới dấu `---` cuối:

```mdx
---
title: "Tên chủ đề"
description: "Mô tả cụ thể phạm vi và giá trị của trang"
---

## Phần đầu tiên

Nội dung tài liệu...
```

Khi thêm, xóa hoặc đổi tên trang, cập nhật `meta.json` của nhóm tương ứng. Internal link nên dùng route có dấu `/` cuối, ví dụ `/docs/networking/bridge-network/`.

## Deploy Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: `22`
- Environment variable `NEXT_PUBLIC_SITE_URL`: URL production đầy đủ của website, ví dụ `https://docker.example.com`

File `wrangler.toml` đã trỏ Cloudflare Pages đến thư mục `out/`.
