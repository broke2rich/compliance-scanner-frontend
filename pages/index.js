import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Welcome to Compliance Scanner</h1>
      <p>Scan your website for GDPR and security compliance in seconds.</p>
      <Link href="/scanner">
        <button style={{ padding: 10, marginTop: 20, cursor: 'pointer' }}>
          Scan My Website
        </button>
      </Link>
    </div>
  );
}
