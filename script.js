document.getElementById('haiku-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const haikuInput = document.getElementById('haiku-input');
    const authorInput = document.getElementById('author-input');
    const haikuList = document.getElementById('haiku-list');

    const haiku = haikuInput.value;
    const author = authorInput.value || "匿名";
    const date = new Date().toISOString().split('T')[0]; // 日付のみ取得

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${haiku}</span>
        <span>${date} | ${author}</span>
        <button class="delete-btn hidden">削除</button>
    `;

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        li.classList.add('red'); // 赤色に変更
        setTimeout(() => {
            const password = prompt("削除パスワードを入力してください：");
            if (password === "mySecret123") {
                li.remove();
            } else {
                alert("パスワードが間違っています！");
                li.classList.remove('red'); // 赤色を戻す
            }
        }, 300);
    });

    haikuList.prepend(li); // 新しい句を上に追加

    // フォームをリセット
    haikuInput.value = '';
    authorInput.value = '';
});

// 削除ボタン表示・非表示の切り替え
document.getElementById('toggle-delete-btn').addEventListener('click', function() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => btn.classList.toggle('hidden'));
    this.textContent = this.textContent === "削除ボタンの表示" ? "削除ボタンの非表示" : "削除ボタンの表示";
});

