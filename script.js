document.addEventListener('DOMContentLoaded', function () {
  const haikuForm = document.getElementById('haiku-form');
  const haikuList = document.getElementById('haiku-list');

  // ローカルストレージからデータを取得
  const savedHaikus = JSON.parse(localStorage.getItem('haikus')) || [];

  // 俳句リストをレンダリングする関数
  function renderHaikus() {
    haikuList.innerHTML = ''; // 初期化
    savedHaikus.forEach((haikuObj, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="haiku-content">${haikuObj.text}</div>
        <div class="haiku-meta">
          <div class="meta-item">投稿者: ${haikuObj.name}</div>
          <div class="meta-item">いいね！<span class="like-count">${haikuObj.likes}</span></div>
          <button class="delete-btn" data-index="${index}">削除</button>
        </div>
      `;

      // いいねボタン機能
      const likeCount = li.querySelector('.like-count');
      const likeButton = li.querySelector('.meta-item:nth-child(2)');
      likeButton.addEventListener('click', function () {
        haikuObj.likes += 1;
        localStorage.setItem('haikus', JSON.stringify(savedHaikus));
        renderHaikus(); // 再描画
      });

      // 削除ボタン機能
      const deleteButton = li.querySelector('.delete-btn');
      deleteButton.addEventListener('click', function () {
        const password = prompt('削除するにはパスワードを入力してください:');
        if (password === 'mySecret123') {
          savedHaikus.splice(index, 1); // 削除
          localStorage.setItem('haikus', JSON.stringify(savedHaikus));
          renderHaikus(); // 再描画
        } else {
          alert('パスワードが間違っています');
        }
      });

      haikuList.appendChild(li);
    });
  }

  // 初期表示時にリストを描画
  renderHaikus();

  // 俳句を追加するイベント
  haikuForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const haiku = document.getElementById('haiku-input').value.trim();
    const name = document.getElementById('name-input').value.trim() || '匿名';

    if (!haiku) {
      alert('俳句を入力してください');
      return;
    }

    // 新しい俳句を保存
    savedHaikus.unshift({
      text: haiku,
      name: name,
      likes: 0
    });

    localStorage.setItem('haikus', JSON.stringify(savedHaikus));
    renderHaikus(); // 再描画

    // 入力欄をクリア
    document.getElementById('haiku-input').value = '';
    document.getElementById('name-input').value = '';
  });
});
