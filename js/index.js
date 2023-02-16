let container = document.querySelector(`.albums`);

for(let i = 0; i < albums.length; i++) {
    let album = albums[i];
    container.innerHTML += `
    <div class="col">
          <a href="album.html?i=${i}" class="text-decoration-none">
            <div class="card">
              <img src="${album.img}" alt="" class="card-image-top">
              <div class="card-body">
                <p class="card-text">
                  ${album.title}
                </p>
              </div>
            </div>
          </a>
        </div>
    `
}

function setupAudio() {
  // Найди коллекцию с треками
  let trackNodes = document.querySelectorAll(`.track`); 
  for (let i = 0; i < trackNodes.length; i++) { 
      // Один элемент
      let node = trackNodes[i];
      let timeNode = node.querySelector(`.track-time`);
      let imgPause = node.querySelector(`.img-pause`);
      let imgPlay = node.querySelector(`.img-playing`);
      // Тег аудио внутри этого элемента
      let audio = node.querySelector(`.audio`); 
      let isPlaying = false;
      node.addEventListener(`click`, function () {
          // Если трек сейчас играет...
          if (isPlaying) {
              isPlaying = false;
              // Поставить на паузу
              audio.pause();
              imgPause.classList.remove(`d-none`);
              imgPlay.classList.add(`d-none`);
          // Если трек сейчас не играет...
          } else {
              isPlaying = true;
              // Включить проигрывание
              audio.play();
              imgPause.classList.add(`d-none`);
              imgPlay.classList.remove(`d-none`);
              updateProgress();
          }
      });
      function updateProgress() {
          // Нарисовать актуальное время
          let time = getTime(audio.currentTime)
          if(timeNode.innerHTML != time){
          timeNode.innerHTML = time;
          }
          // Нужно ли вызвать её ещё раз?
          if (isPlaying) {
              requestAnimationFrame(updateProgress);
          }
          
      }
  }
}
setupAudio();
function getTime(time){
  let currentSeconds = Math.floor(time);
  let minutes = Math.floor(currentSeconds/60);
  let seconds = Math.floor(currentSeconds%60);
  if(seconds < 10) {
      seconds = `0` + seconds;
  }
  if(minutes < 10) {
      minutes = `0` + minutes;
  }
  return `${minutes}:${seconds}`
}