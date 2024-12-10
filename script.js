document.addEventListener("DOMContentLoaded", function () {
    const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
    const haikuList = document.getElementById("haiku-list");

    storedHaikus.forEach((haikuObj, index) => {
        addHaikuToList(haikuObj, index, storedHaikus);
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
        storedHaikus.push(newHaiku);
        localStorage.setItem("haikus", JSON.stringify(storedHaikus));

        addHaikuToList(newHaiku, storedHaikus.length - 1, storedHaikus);

        document.getElementById("haiku-input").value = "";
    } else {
        alert("俳句を入力してください！");
    }
});

function addHaikuToList(haikuObj, index, storedHaikus) {
    const haikuList = document.getElementById("haiku-list");

    const newHaiku = document.createElement("li");
    newHaiku.innerHTML = `
        <div class="haiku-content">
            <button class="like-btn">いいね ${haikuObj.likes}</button>
            <span>${haikuObj.text}</span>
            <span class="haiku-date">${haikuObj.date}</span>
        </div>
        <button class="delete-btn">削除</button>
    `;

    // いいねボタンの動作
    const likeButton = newHaiku.querySelector(".like-btn");
    likeButton.addEventListener("click", function () {
        haikuObj.likes += 1;
        likeButton.textContent = `いいね ${haikuObj.likes}`;
        localStorage.setItem("haikus", JSON.stringify(storedHaikus));
    });

    // 削除ボタンの動作
    const deleteButton = newHaiku.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
        const password = prompt("削除するにはパスワードを入力してください:");
        if (password === "mySecret123") {
            storedHaikus.splice(index, 1);
            localStorage.setItem("haikus", JSON.stringify(storedHaikus));
            haikuList.removeChild(newHaiku);
        } else {
            alert("パスワードが間違っています。削除できません。");
        }
    });

    haikuList.appendChild(newHaiku);
}
