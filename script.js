document.getElementById('haiku-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const haiku = document.getElementById('haiku-input').value.trim();
  const name = document.getElementById('name-input').value.trim() || '匿名';

  if (!haiku) {
    alert('俳句を入力してください');
    return;
  }

  const haikuList = document.getElementById('haiku-list');

  const li = document.createElement('li');
  li.innerHTML = `
    <div class="haiku-content">${haiku}</div>
    <div class="haiku-meta">
      <div class="meta-item">投稿者: ${name}</div>
      <div class="meta-item">いいね！<span class="like-count">0</span></div>
      <button class="delete-btn">削除</button>
    </div>
  `;

  // 「いいね！」機能
  const likeCount = li.querySelector('.like-count');
  const likeButton = li.querySelector('.meta-item:nth-child(2)');
  likeButton.addEventListener('click', function () {
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  });

  // 削除機能
  const deleteButton = li.querySelector('.delete-btn');
  deleteButton.addEventListener('click', function () {
    const password = prompt('削除するにはパスワードを入力してください:');
    if (password === 'mySecret123') {
      haikuList.removeChild(li);
    } else {
      alert('パスワードが間違っています');
    }
  });

  haikuList.prepend(li); // 新しい俳句を上に追加

  // 入力欄をクリア
  document.getElementById('haiku-input').value = '';
  document.getElementById('name-input').value = '';
});
