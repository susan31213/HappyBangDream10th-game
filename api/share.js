module.exports = (req, res) => {
  const rank = req.query.rank ?? 'CLEAR0';

  const rankConfig = {
    CLEAR0: { image: '/ogp/mygo/clear_0.png' },
    CLEAR1: { image: '/ogp/mygo/clear_1.png' },
    CLEAR2: { image: '/ogp/mygo/clear_2.png' },
    CLEAR3: { image: '/ogp/mygo/clear_3.png' },
    CLEAR_SP: { image: '/ogp/mygo/clear_sp.png' },
  };

  const config = rankConfig[rank] ?? rankConfig['CLEAR0'];
  const baseUrl = `https://happy-bang-dream10th-game.vercel.app`;
  const imageUrl = `${baseUrl}${config.image}`;
  const shareUrl = `${baseUrl}/api/share?rank=${rank}`;

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
  <meta http-equiv="refresh" content="0;url=https://happy-bang-dream10th-game.vercel.app">
</head>
<body>
  <p>リダイレクト中...</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html;charset=UTF-8');
  // XのOGPクローラー向けキャッシュ設定
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).send(html);
};
