export default function handler(req, res) {
  const rank = req.query.rank ?? 'NONE';

  const rankConfig = {
    NONE: { image: '/ogp/mygo/clear_0.png', label: 'ともりんの石検定をクリアできなかった...！あなたは何級？ともりの石検定に挑戦してみてね！' },
    1: { image: '/ogp/mygo/clear_1.png', label: 'ともりんの石検定3級を取りました！あなたは何級？ともりの石検定に挑戦してみてね！' },
    2: { image: '/ogp/mygo/clear_2.png', label: 'ともりんの石検定2級を取りました！あなたは何級？ともりの石検定に挑戦してみてね！' },
    3: { image: '/ogp/mygo/clear_3.png', label: 'ともりんの石検定1級を取りました！あなたは何級？ともりの石検定に挑戦してみてね！' },
    SP: { image: '/ogp/mygo/clear_sp.png', label: 'ともりんの石検定1級を取りました！あなたは何級？ともりの石検定に挑戦してみてね！' },
  };

  const config = rankConfig[rank] ?? rankConfig['NONE'];
  const baseUrl = `https://happy-bang-dream10th-game.vercel.app`;
  const imageUrl = `${baseUrl}${config.image}`;
  const shareUrl = `${baseUrl}/api/share?rank=${rank}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta property="og:type"         content="website">
  <meta property="og:url"          content="${shareUrl}">
  <meta property="og:title"        content="${config.label} | ゲーム名">
  <meta property="og:description"  content="あなたのスコアをチェック！">
  <meta property="og:image"        content="${imageUrl}">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="${config.label} | ゲーム名">
  <meta name="twitter:description" content="あなたのスコアをチェック！">
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
}
