import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 rounded-full border px-4 py-1 text-sm font-medium">
        Tài liệu Docker bằng tiếng Việt
      </p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
        Học Docker từ nền tảng đến production
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-fd-muted-foreground">
        Một curriculum có hệ thống về container, image, networking, storage,
        Compose, security, CI/CD và vận hành thực tế.
      </p>
      <Link
        href="/docs/"
        className="mt-8 rounded-lg bg-fd-primary px-5 py-3 font-medium text-fd-primary-foreground"
      >
        Bắt đầu học
      </Link>
    </main>
  );
}
