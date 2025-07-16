var carouselWidth = $(".carousel-inner")[0].scrollWidth;
var cardWidth = $(".carousel-item").width();

var scrollPosition = 0;

$(".carousel-control-next").on("click", function () {
  if (scrollPosition < carouselWidth - cardWidth * 4) console.log("next");
  scrollPosition = scrollPosition + cardWidth;
  $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
});

$(".carousel-control-prev").on("click", function () {
  if (scrollPosition > 0) console.log("next");
  scrollPosition = scrollPosition - cardWidth;
  $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
});

//Find The Audio
const audios = document.querySelectorAll(".player__audio");
const playPauseButtons = document.querySelectorAll(".play-pause");

// Función para individualizar los audios
function pauseAllAudios(exceptAudio = null) {
  audios.forEach((audio) => {
    if (audio !== exceptAudio) {
      audio.pause();
    }
  });

  playPauseButtons.forEach((button) => {
    button.querySelector(".pause-btn").classList.add("hide");
    button.querySelector(".play-btn").classList.remove("hide");
  });
}

// Función para reproducir o pausar un audio
function togglePlayPause(audio, button) {
  if (audio.paused || audio.ended) {
    pauseAllAudios(audio);
    audio.play();
    button.querySelector(".pause-btn").classList.remove("hide");
    button.querySelector(".play-btn").classList.add("hide");
  } else {
    audio.pause();
    button.querySelector(".pause-btn").classList.add("hide");
    button.querySelector(".play-btn").classList.remove("hide");
  }
}

// Función que inicia la barra de progreso y el botón Play/Pause
function iniciarReproductores() {
  playPauseButtons.forEach((button, index) => {
    const audio = audios[index];
    const barra = document.getElementById(`barra${index + 1}`);
    const progreso = document.getElementById(`progreso${index + 1}`);

    button.addEventListener("click", () => togglePlayPause(audio, button));

    audio.addEventListener("timeupdate", function () {
      const porcentajeProgreso = (audio.currentTime / audio.duration) * 100;
      progreso.style.width = porcentajeProgreso + "%";
    });

    barra.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const clickPosX = e.clientX - rect.left;
      const anchoBarra = rect.width;
      const porcentajeClick = (clickPosX / anchoBarra) * 100;

      audio.currentTime = (porcentajeClick * audio.duration) / 100;
    });

    audio.addEventListener("ended", function () {
      button.querySelector(".pause-btn").classList.add("hide");
      button.querySelector(".play-btn").classList.remove("hide");
    });
  });
}

window.addEventListener("load", iniciarReproductores);
