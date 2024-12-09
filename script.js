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

        document.getElementById("haiku-input").value = "";
    } else {
        alert("俳句を入力してください！");
    }
});

    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

button {
    padding: 10px 20px;
    background-color: #6b8e23;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #556b2f;
}

#haiku-list {
    list-style-type: none;
    padding: 0;
}

#haiku-list li {
    background-color: #f0f0f0;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

footer {
    text-align: center;
    padding: 10px 0;
    margin-top: 20px;
    background-color: #6b8e23;
    color: white;
}
