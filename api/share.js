exports.handler = async (event) => {
  const rank = event.queryStringParameters?.rank ?? 'CLEAR_0';

  const rankConfig = {
    CLEAR_0: { image: '/ogp/mygo/clear_00.png' },
    CLEAR_1: { image: '/ogp/mygo/clear_01.png' },
    CLEAR_2: { image: '/ogp/mygo/clear_02.png' },
    CLEAR_3: { image: '/ogp/mygo/clear_03.png' },
    CLEAR_SP: { image: '/ogp/mygo/clear_sp.png' },
  };

  const config = rankConfig[rank] ?? rankConfig.CLEAR_0;
  const host = event.headers?.host || 'happy-bang-dream10th-game.netlify.app';
  const protocol = event.headers?.['x-forwarded-proto'] || event.headers?.['x-forwarded-protocol'] || 'https';
  const baseUrl = `${protocol}://${host}`;
  const imageUrl = `${baseUrl}${config.image}`;
  const shareUrl = `${baseUrl}/api/share?rank=${encodeURIComponent(rank)}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta property="og:type"         content="website">
  <meta property="og:url"          content="${shareUrl}">
  <meta property="og:title"        content="あなたは何級？ともりんの石検定に挑戦してみてね！">
  <meta property="og:description"  content="あなたの石検定レベルをチェック！">
  <meta property="og:image"        content="${imageUrl}">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="あなたは何級？ともりんの石検定に挑戦してみてね！">
  <meta name="twitter:description" content="あなたの石検定レベルをチェック！">
  <meta name="twitter:image"       content="${imageUrl}">

  <!-- ゲーム本体にリダイレクト（任意） -->
  <meta http-equiv="refresh" content="0;url=https://happy-bang-dream10th-game.netlify.app">
</head>
<body>
  <p>リダイレクト中...</p>
</body>
</html>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
    body: html,
  };
};
