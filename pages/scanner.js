import { useState } from 'react';

export default function Scanner() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('https://compliance-scanner-backend.vercel.app/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      if (!res.ok) {
        throw new Error('Scan failed');
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to scan. Please check the URL and try again.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Website Compliance Scanner</h1>
      <input
        type="text"
        placeholder="Enter your website URL (https://...)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: 10, width: 300 }}
      />
      <button
        onClick={handleScan}
        style={{ padding: 10, marginLeft: 10, cursor: 'pointer' }}
      >
        {loading ? 'Scanning...' : 'Scan Website'}
      </button>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 30 }}>
          <h2>Scan Results:</h2>
          <ul>
            <li>Privacy Policy Found: {result.privacyPolicy ? '✅' : '❌'}</li>
            <li>Terms of Service Found: {result.termsOfService ? '✅' : '❌'}</li>
            <li>Cookie Consent Banner: {result.cookieBanner ? '✅' : '❌'}</li>
            <li>SSL Certificate Valid: {result.sslValid ? '✅' : '❌'}</li>
            <li>Content-Security-Policy Header: {result.headers.contentSecurityPolicy ? '✅' : '❌'}</li>
            <li>X-Frame-Options Header: {result.headers.xFrameOptions ? '✅' : '❌'}</li>
            <li>Strict-Transport-Security Header: {result.headers.strictTransportSecurity ? '✅' : '❌'}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
