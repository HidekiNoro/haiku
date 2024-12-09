// ページ読み込み時にローカルストレージから俳句を表示
document.addEventListener("DOMContentLoaded", function () {
    const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
    const haikuList = document.getElementById("haiku-list");

    // 保存されている俳句をリストに追加
    storedHaikus.forEach((haiku) => {
        const newHaiku = document.createElement("li");
        newHaiku.textContent = haiku;
        haikuList.appendChild(newHaiku);
    });
});

// 俳句を投稿する機能
document.getElementById("post-haiku").addEventListener("click", function () {
    const haikuInput = document.getElementById("haiku-input").value.trim();

    if (haikuInput) {
        const haikuList = document.getElementById("haiku-list");
        const newHaiku = document.createElement("li");
        newHaiku.textContent = haikuInput;
        haikuList.appendChild(newHaiku);

        const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
        storedHaikus.push(haikuInput);
        localStorage.setItem("haikus", JSON.stringify(storedHaikus));

        document.getElementById("haiku-input").value = ""; // 入力欄をクリア
    } else {
        alert("俳句を入力してください！");
    }
});
