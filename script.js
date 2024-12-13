document.addEventListener('DOMContentLoaded', function() {
    const haikuForm = document.getElementById('haiku-form');
    const haikuInput = document.getElementById('haiku-input');
    const authorInput = document.getElementById('author-input');
    const haikuList = document.getElementById('haiku-list');
    const toggleDeleteBtn = document.getElementById('toggle-delete-btn');
    const DELETE_PASSWORD = "mySecret123";

    // ローカルストレージから保存されたデータを取得
    const savedHaikus = JSON.parse(localStorage.getItem('haikus')) || [];

    // 削除ボタンの表示状態をトグル
    let deleteButtonsVisible = false;

    // 俳句リストを表示
    function renderHaikus() {
        haikuList.innerHTML = '';
        savedHaikus.forEach((haiku) => {
            const li = createHaikuElement(haiku.text, haiku.author, haiku.date);
            haikuList.appendChild(li);
        });

        // 削除ボタンの表示状態を反映
        updateDeleteButtonVisibility();
    }

    // 俳句を保存
    function saveHaikus() {
        localStorage.setItem('haikus', JSON.stringify(savedHaikus));
    }

    // 俳句要素を作成
    function createHaikuElement(text, author, date) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <span>${date} | ${author}</span>
            <button class="delete-btn hidden">削除</button>
        `;
        const deleteButton = li.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function() {
            const password = prompt("削除パスワードを入力してください：");
            if (password === DELETE_PASSWORD) {
                const index = Array.from(haikuList.children).indexOf(li);
                savedHaikus.splice(index, 1);
                saveHaikus();
                renderHaikus();
            } else {
                alert("パスワードが間違っています！");
            }
        });
        return li;
    }

    // 削除ボタンの表示/非表示を更新
    function updateDeleteButtonVisibility() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            if (deleteButtonsVisible) {
                btn.classList.remove('hidden'); // 表示
            } else {
                btn.classList.add('hidden'); // 非表示
            }
        });
    }

    // 新しい俳句を追加
    haikuForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const haiku = haikuInput.value;
        const author = authorInput.value || "匿名";
        const date = new Date().toISOString().split('T')[0];

        const newHaiku = { text: haiku, author: author, date: date };
        savedHaikus.unshift(newHaiku);
        saveHaikus();
        renderHaikus();

        haikuInput.value = '';
        authorInput.value = '';
    });

    // 削除ボタンの表示/非表示切り替え
    toggleDeleteBtn.addEventListener('click', function() {
        deleteButtonsVisible = !deleteButtonsVisible; // 表示状態をトグル
        updateDeleteButtonVisibility();
    });

    // 初期表示
    renderHaikus();
});
