import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="section-label">404</p>
        <h1 className="mt-3 font-display text-5xl font-semibold">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-8">Back to portfolio</Link>
      </div>
    </main>
  );
}
