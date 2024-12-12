document.getElementById('haiku-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const haikuInput = document.getElementById('haiku-input');
    const authorInput = document.getElementById('author-input');
    const haikuList = document.getElementById('haiku-list');

    const haiku = haikuInput.value;
    const author = authorInput.value || "匿名";
    const date = new Date().toISOString().split('T')[0]; // 日付だけを取得

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${haiku}</span>
        <span>${date} | ${author}</span>
        <button class="delete-btn">削除</button>
    `;

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        li.classList.add('blue'); // 青色に変更
        setTimeout(() => {
            if (confirm("この句を削除しますか？")) {
                li.remove();
            } else {
                li.classList.remove('blue'); // 青色を戻す
            }
        }, 300);
    });

    haikuList.prepend(li); // 新しい句を上に追加

    // フォームをリセット
    haikuInput.value = '';
    authorInput.value = '';
});
