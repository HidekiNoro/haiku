const haikuList = document.getElementById("haiku-list");
const toggleDeleteBtn = document.getElementById("toggle-delete-btn");
let showDeleteButtons = false;

// 俳句を追加する
function addHaiku() {
    const haikuInput = document.getElementById("haiku-input");
    const authorInput = document.getElementById("author-input");
    const haikuText = haikuInput.value;
    const authorText = authorInput.value || "匿名";

    if (haikuText.trim() === "") {
        alert("俳句を入力してください！");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <div>
            <p>${haikuText}</p>
            <small>投稿者: ${authorText}</small>
        </div>
        <div>
            <button class="like-btn" onclick="likeHaiku(this)">いいね！ <span>0</span></button>
            <button class="delete-btn" onclick="deleteHaiku(this)">削除</button>
        </div>
    `;

    // 新しい俳句をリストの一番上に追加
    haikuList.insertBefore(li, haikuList.firstChild);

    haikuInput.value = "";
    authorInput.value = "";
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
    const li = button.closest("li");
    li.remove();
}

// いいね！機能
function likeHaiku(button) {
    const span = button.querySelector("span");
    const currentLikes = parseInt(span.textContent, 10);
    span.textContent = currentLikes + 1;
}
