document.addEventListener('DOMContentLoaded', function () {
    const haikuForm = document.getElementById('haiku-form');
    const haikuInput = document.getElementById('haiku-input');
    const authorInput = document.getElementById('author-input');
    const haikuList = document.getElementById('haiku-list');
    const toggleDeleteBtn = document.getElementById('toggle-delete-btn');
    const DELETE_PASSWORD = "mySecret123";

    let deleteButtonsVisible = false;

    // ローカルストレージから保存
    const savedHaikus = JSON.parse(localStorage.getItem('haikus')) || [];

    function renderHaikus() {
        haikuList.innerHTML = '';
        savedHaikus.forEach((haiku, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${haiku.text}</span>
                <span>${haiku.author || "匿名"} | ${haiku.date}</span>
                <button class="delete-btn ${deleteButtonsVisible ? "" : "hidden"}" data-index="${index}">削除</button>
            `;

            li.querySelector('.delete-btn').addEventListener('click', () => {
                const password = prompt("削除パスワードを入力:");
                if (password === DELETE_PASSWORD) {
                    savedHaikus.splice(index, 1);
                    localStorage.setItem('haikus', JSON.stringify(savedHaikus));
                    renderHaikus();
                } else {
                    alert("パスワードが間違っています！");
                }
            });

            haikuList.appendChild(li);
        });
    }

    haikuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = haikuInput.value;
        const author = authorInput.value;
        const date = new Date().toISOString().split('T')[0];

        savedHaikus.unshift({ text, author, date });
        localStorage.setItem('haikus', JSON.stringify(savedHaikus));

        haikuInput.value = '';
        authorInput.value = '';
        renderHaikus();
    });

    toggleDeleteBtn.addEventListener('click', () => {
        deleteButtonsVisible = !deleteButtonsVisible;
        renderHaikus();
    });

    renderHaikus();
});
