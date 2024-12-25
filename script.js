const haikuList = document.getElementById("haiku-list");
const toggleDeleteBtn = document.getElementById("toggle-delete-btn");
let showDeleteButtons = false;

// アクセスカウンターを更新する関数
async function updateCounter() {
    try {
        // CountAPI のエンドポイントにリクエストを送信
        const response = await fetch('https://api.countapi.xyz/hit/yourdomain.com/haiku');
        const data = await response.json();
        // カウンターの値を表示
        document.getElementById('access-count').innerText = `アクセス数: ${data.value}`;
    } catch (error) {
        console.error('カウンターの取得に失敗しました:', error);
        document.getElementById('access-count').innerText = `アクセス数: 取得失敗`;
    }
}

// ページ読み込み時に保存された俳句を表示し、アクセスカウンターを更新
window.addEventListener("load", function () {
    // 俳句の表示
    const savedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
    savedHaikus.forEach(({ text, author, date }) => addHaikuToList(text, author, date));

    // アクセスカウンターの更新
    updateCounter();
});

// 俳句を追加する
function addHaiku() {
    const haikuInput = document.getElementById("haiku-input");
    const authorInput = document.getElementById("author-input");
    const haikuText = haikuInput.value;
    const authorText = authorInput.value || "匿名";
    const currentDate = new Date().toLocaleDateString(); // 日付を取得

    if (haikuText.trim() === "") {
        alert("俳句を入力してください！");
        return;
    }

    // 俳句をリストに追加
    addHaikuToList(haikuText, authorText, currentDate);

    // ローカルストレージに保存
    const savedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
    savedHaikus.push({ text: haikuText, author: authorText, date: currentDate });
    localStorage.setItem("haikus", JSON.stringify(savedHaikus));

    // 入力欄をクリア
    haikuInput.value = "";
    authorInput.value = "";
}

// ローカルストレージの俳句をリストに表示
function addHaikuToList(text, author, date) {
    const li = document.createElement("li");
    li.innerHTML = `
        <p>${text}</p>
        <small>投稿者: ${author}</small>
        <small>${date}</small>
        <button class="like-btn" onclick="likeHaiku(this)">いいね！ <span>0</span></button>
        <button class="delete-btn" onclick="deleteHaiku(this)">削除</button>
    `;
    haikuList.insertBefore(li, haikuList.firstChild);
}

// 削除ボタンの表示/非表示を切り替える
function toggleDeleteButtons() {
    showDeleteButtons = !showDeleteButtons;
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((btn) => {
        btn.style.display = showDeleteButtons ? "inline-block" : "none";
    });

    toggleDeleteBtn.textContent = showDeleteButtons
        ? "削除ボタンを非表示にする"
        : "削除ボタンを表示する";
}

// 俳句を削除する
function deleteHaiku(button) {
    const password = prompt("削除するにはパスワードを入力してください:");
    if (password === "mySecret123") { // ここは適宜変更してください
        const li = button.closest("li");
        const text = li.querySelector("p").textContent;

        // ローカルストレージから削除
        const savedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
        const updatedHaikus = savedHaikus.filter((haiku) => haiku.text !== text);
        localStorage.setItem("haikus", JSON.stringify(updatedHaikus));

        // リストから削除
        li.remove();
    } else {
        alert("パスワードが違います！");
    }
}

// いいね！機能
function likeHaiku(button) {
    const span = button.querySelector("span");
    const currentLikes = parseInt(span.textContent, 10);
    span.textContent = currentLikes + 1;
}
