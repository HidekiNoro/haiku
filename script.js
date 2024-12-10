// ページ読み込み時にローカルストレージから俳句を表示
document.addEventListener("DOMContentLoaded", function () {
    const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
    const haikuList = document.getElementById("haiku-list");

    // 保存されている俳句をリストに追加
    storedHaikus.forEach((haiku, index) => {
        addHaikuToList(haiku, index, storedHaikus);
    });

    // 削除ボタンの表示/非表示を切り替える
    document.getElementById("toggle-delete").addEventListener("click", function () {
        document.querySelectorAll(".delete-btn").forEach((button) => {
            if (button.style.display === "none") {
                button.style.display = "inline-block";
            } else {
                button.style.display = "none";
            }
        });
    });
});

// 俳句を投稿する機能
document.getElementById("post-haiku").addEventListener("click", function () {
    const haikuInput = document.getElementById("haiku-input").value.trim();

    if (haikuInput) {
        const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
        storedHaikus.push(haikuInput);
        localStorage.setItem("haikus", JSON.stringify(storedHaikus));

        addHaikuToList(haikuInput, storedHaikus.length - 1, storedHaikus);

        document.getElementById("haiku-input").value = ""; // 入力欄をクリア
    } else {
        alert("俳句を入力してください！");
    }
});

// リストに俳句を追加し、削除ボタンをつける関数
function addHaikuToList(haiku, index, storedHaikus) {
    const haikuList = document.getElementById("haiku-list");

    const newHaiku = document.createElement("li");
    newHaiku.textContent = haiku;

    // 削除ボタンを作成（デフォルトで非表示）
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-btn"; // 削除ボタンにクラスを付与
    deleteButton.addEventListener("click", function () {
        storedHaikus.splice(index, 1); // 配列から削除
        localStorage.setItem("haikus", JSON.stringify(storedHaikus)); // ローカルストレージを更新
        haikuList.removeChild(newHaiku); // リストから削除
        alert("俳句を削除しました！");
    });

    newHaiku.appendChild(deleteButton);
    haikuList.appendChild(newHaiku);
}
