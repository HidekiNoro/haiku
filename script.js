<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>俳句の世界</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>俳句の世界</h1>
        <p>あなたの心に響く俳句を投稿しましょう</p>
    </header>

    <main>
        <section id="haiku-display">
            <h2>今日の俳句</h2>
            <div id="current-haiku">
                <p>ここに俳句が表示されます</p>
            </div>
        </section>

        <section id="haiku-form">
            <h2>俳句を投稿する</h2>
            <form id="haiku-post-form">
                <textarea id="haiku-input" rows="3" placeholder="俳句をここに入力してください"></textarea>
                <button type="button" id="post-haiku">投稿する</button>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 俳句の世界</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
