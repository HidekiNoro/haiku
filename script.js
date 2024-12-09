document.addEventListener("DOMContentLoaded", function () {
    const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
    const haikuList = document.getElementById("haiku-list");

    storedHaikus.forEach((haikuObj, index) => {
        addHaikuToList(haikuObj, index, storedHaikus, false);
    });

    document.getElementById("toggle-delete").addEventListener("click", function () {
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.style.display =
                button.style.display === "none" ? "inline-block" : "none";
        });
    });
});

document.getElementById("post-haiku").addEventListener("click", function () {
    const haikuInput = document.getElementById("haiku-input").value.trim();
    if (haikuInput) {
        const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
        const newHaiku = { text: haikuInput, date: new Date().toLocaleString(), likes: 0 };
        storedHaikus.unshift(newHaiku); // 新しい句をリストの先頭に追加
        localStorage.setItem("haikus", JSON.stringify(storedHaikus));

        addHaikuToList(newHaiku, 0, storedHaikus, true); // 新しい句を直接上に追加

        document.getElementById("haiku-input").value = "";
    } else {
        alert("俳句を入力してください！");
    }
});

function addHaikuToList(haikuObj, index, storedHaikus, prepend) {
    const haikuList = document.getElementById("haiku-list");

    // 外側のコンテナ
    const haikuContainer = document.createElement("div");
    haikuContainer.className = "haiku-container";

    // 俳句本文（左側）
    const haikuText = document.createElement("div");
    haikuText.textContent = haikuObj.text;
    haikuText.className = "haiku-text";

    // メタ情報（右側）
    const metaContainer = document.createElement("div");
    metaContainer.className = "meta-container";

    // 日付
    const haikuDate = document.createElement("span");
    haikuDate.textContent = haikuObj.date;
    haikuDate.className = "haiku-date";

    // いいねボタン
    const likeButton = document.createElement("button");
    likeButton.textContent = `いいね ${haikuObj.likes}`;
    likeButton.className = "like-btn";
    likeButton.addEventListener("click", function () {
        haikuObj.likes += 1;
        likeButton.textContent = `いいね ${haikuObj.likes}`;
        localStorage.setItem("haikus", JSON.stringify(storedHaikus));
    });

    // 削除ボタン
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.className = "delete-btn";
    deleteButton.style.display = "none";
    deleteButton.addEventListener("click", function () {
        const password = prompt("削除するにはパスワードを入力してください:");
        if (password === "mySecret123") {
            storedHaikus.splice(index, 1);
            localStorage.setItem("haikus", JSON.stringify(storedHaikus));
            haikuList.removeChild(haikuContainer);
        } else {
            alert("パスワードが間違っています。削除できません。");
        }
    });

    // 構造を組み立てる
    metaContainer.appendChild(likeButton);
    metaContainer.appendChild(deleteButton);
    metaContainer.appendChild(haikuDate);

    haikuContainer.appendChild(haikuText);
    haikuContainer.appendChild(metaContainer);

    // 新しい句はリストの上に追加
    if (prepend) {
        haikuList.prepend(haikuContainer);
    } else {
        haikuList.appendChild(haikuContainer);
    }
}
