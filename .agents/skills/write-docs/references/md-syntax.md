# Markdown Syntax — Gotchas khi viết doc cho Fumadocs

## Frontmatter — bắt buộc

```yaml
---
title: "Tên trang"
description: "Mô tả ngắn"
---
```

Thiếu → title trống trên sidebar và tab trình duyệt.

---

## Internal Links — trailing slash bắt buộc

```markdown
✅ [Xem thêm](/basics/01-microservice-overview/)
❌ [Xem thêm](./01-microservice-overview.md)
❌ [Xem thêm](/basics/01-microservice-overview)
```

`next.config.mjs` có `trailingSlash: true` — thiếu `/` cuối dẫn đến redirect 2 lần hoặc 404.

---

## JSX Components — dòng trống trước và sau

```mdx
✅
Đoạn văn.

<Callout type="warn">Nội dung</Callout>

Đoạn văn tiếp.

❌
Đoạn văn.
<Callout type="warn">Nội dung</Callout>
Đoạn văn tiếp.
```

Props string dùng nháy đôi, props array dùng `{}`:
```mdx
<Callout type="warn">...</Callout>
<Tabs items={['A', 'B']}>...</Tabs>
```

---

## Highlighted callouts — dùng Fumadocs component

Dùng `<Callout>` để tạo highlight/cảnh báo trong MDX. Component này đã được đăng ký global trong các repository Fumadocs theo skill:

```mdx
<Callout type="warn" title="Cảnh báo">
  Dòng 1
  Dòng 2
</Callout>
```

Các type thường dùng: `info` (mặc định), `warn`, `error`, `success`.

> **Cảnh báo:** Không dùng GitHub-style `> [!NOTE]`, `> [!IMPORTANT]`, hoặc `> [!WARNING]` mặc định. Nếu repository không có remark plugin chuyển đổi tương ứng, chúng sẽ render thành literal blockquote text thay vì highlight. Chỉ dùng cú pháp đó sau khi kiểm tra cả plugin trong `source.config.ts` và build output.

---

## Code Blocks — luôn ghi language

````markdown
✅ ```bash
✅ ```typescript
✅ ```json
✅ ```mermaid

❌ ```   ← không có language → không có syntax highlight
````

---

## Mermaid — không indent code block

````markdown
✅
```mermaid
graph TD
    A --> B
```

❌
  ```mermaid
  graph TD     ← indent → không parse được
```
````

---

## Headings — không bỏ qua cấp

```markdown
✅          ❌
## H2       ## H2
### H3      #### H4  ← bỏ qua H3 → TOC lỗi hierarchy
#### H4
```

---

## Bảng — cần dòng trống xung quanh

```markdown
✅
Đoạn văn.

| Col A | Col B |
|-------|-------|
| data  | data  |

Đoạn văn tiếp.
```

---

## Tóm tắt nhanh

| Triệu chứng | Nguyên nhân | Fix |
|-------------|------------|-----|
| Component không render | Thiếu dòng trống trước/sau | Thêm blank line |
| Link 404 | Thiếu `/` cuối | Thêm trailing slash |
| Admonition không render | Dòng trống bên trong block | Xóa blank line trong block |
| Mermaid không render | Indent hoặc sai syntax | Bỏ indent |
| TOC bị lộn | Bỏ qua cấp heading | Giữ đúng thứ tự H2→H3→H4 |
| Sidebar không có title | Thiếu frontmatter | Thêm `title` vào frontmatter |
| Không có syntax highlight | Code block không có language | Thêm language tag |
