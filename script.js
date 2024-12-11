document.addEventListener("DOMContentLoaded", function () {
    const storedHaikus = JSON.parse(localStorage.getItem("haikus")) || [];
    const haikuList = document.getElementById("haiku-list");
    const toggleDeleteButton = document.getElementById("toggle-delete");

    storedHaikus.forEach(addHaikuToList);

    document.getElementById("post-haiku").addEventListener("click", function () {
        const haikuInput = document.getElementById("haiku-input").value.trim();
        const nameInput = document.getElementById("name-input").value.trim();

        if (haikuInput && nameInput) {
            const newHaiku = {
                text: haikuInput,
                name: nameInput,
                date: new Date().toLocaleString(),
                likes: 0,
            };

            storedHaikus.unshift(newHaiku);
            localStorage.setItem("haikus", JSON.stringify(storedHaikus));

            addHaikuToList(newHaiku);
            document.getElementById("haiku-input").value = "";
            document.getElementById("name-input").value = "";
        } else {
            alert("俳句と名前を入力してください！");
        }
    });

    toggleDeleteButton.addEventListener("click", function () {
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((btn) => {
            btn.style.display = btn.style.display === "none" ? "block" : "none";
        });
    });

    function addHaikuToList(haiku) {
        const haikuContainer = document.createElement("div");
        haikuContainer.className = "haiku-container";

        const haikuText = document.createElement("div");
        haikuText.textContent = `${haiku.text} - 投稿者: ${haiku.name}`;
        haikuText.className = "haiku-text";

        const metaContainer = document.createElement("div");
        metaContainer.className = "meta-container";

        const haikuDate = document.createElement("span");
        haikuDate.textContent = haiku.date;
        haikuDate.className = "haiku-date";

        const likeButton = document.createElement("button");
        likeButton.textContent = `いいね ${haiku.likes}`;
        likeButton.className = "like-btn";
        likeButton.addEventListener("click", function () {
            haiku.likes += 1;
            likeButton.textContent = `いいね ${haiku.likes}`;
            localStorage.setItem("haikus", JSON.stringify(storedHaikus));
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", function () {
            const index = storedHaikus.indexOf(haiku);
            storedHaikus.splice(index, 1);
            localStorage.setItem("haikus", JSON.stringify(storedHaikus));
            haikuList.removeChild(haikuContainer);
        });

        metaContainer.appendChild(haikuDate);
        metaContainer.appendChild(likeButton);
        metaContainer.appendChild(deleteButton);

        haikuContainer.appendChild(haikuText);
        haikuContainer.appendChild(metaContainer);

        haikuList.prepend(haikuContainer);
    }
});
