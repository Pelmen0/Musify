let container = document.querySelector(`.album`)

let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);

let album = albums[i];

if(!album){
    container.innerHTML = `<p class = "songs">Error 404. Выполняется переход на главную.</p>`;
    // Класс songs добавлен для выделения текста белым цветом
    setTimeout(() => {
        window.location.pathname = `index.html`        
    }, 5000);
} else {
    container.innerHTML = `
    <div class="card mb-3">
        <div class="row">
            <div class="col-4">
                <img src="${album.img}" alt="" class="img-fluid rounded-start">
            </div>
            <div class="col-8">
                <div class="card-body">
                    <h5 class="card-title">
                        ${album.title}
                    </h5>
                    <p class="card-text">${album.description}</p>
                    <p class="card-text"><small>Сборник выпущен в ${album.year} году</small></p>
                </div>
            </div>
        </div>
    </div>
    `

    let playlist = document.querySelector(`.playlist`)

    let tracks = album.tracks;
    for(let j = 0; j < tracks.length; j++){
        let track = tracks[j];

        playlist.innerHTML += `
        <li class="d-flex align-items-center track">
            <audio class="audio" src="${track.src}"></audio>
            <img src="assets/playbutton.png" height="30px" alt="" class="me-3 img-pause">
            <img src="assets/pausebutton.png" height="30px" alt="" class="me-3 img-playing d-none">
            <div>
                <div class="track-name">${track.title}</div>
                <div class="track-songer">${track.author}</div>
            </div>
            <div class="ms-auto track-time">
                ${track.time}
            </div>
        </li>
        `
    }
    function setupAudio() {
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.track`); 
        for (let i = 0; i < trackNodes.length; i++) { 
            // Один элемент
            let node = trackNodes[i];
            let track = tracks[i]
            let timeNode = node.querySelector(`.track-time`);
            let imgPause = node.querySelector(`.img-pause`);
            let imgPlay = node.querySelector(`.img-playing`);
            // Тег аудио внутри этого элемента
            let audio = node.querySelector(`.audio`); 
            let isPlaying = false;
            node.addEventListener(`click`, function () {
                // Если трек сейчас играет...
                if (track.isPlaying) {
                    track.isPlaying = false;
                    // Поставить на паузу
                    audio.pause();
                    imgPause.classList.remove(`d-none`);
                    imgPlay.classList.add(`d-none`);
                // Если трек сейчас не играет...
                } else {
                    track.isPlaying = true;
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
                if (track.isPlaying) {
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
}