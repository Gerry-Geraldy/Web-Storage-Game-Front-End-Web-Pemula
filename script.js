//inisialiasi variabel untuk menampung elemen dokumen
const localTotalVictoryField = document.getElementById(
  "local-total-victory-field"
);
const localMaximumAttemptField = document.getElementById(
  "local-maximum-attempt-field"
);
const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButton1 = document.getElementById("answer-1-button");
const answerButton2 = document.getElementById("answer-2-button");
const answerButton3 = document.getElementById("answer-3-button");
const sessionUserAnswerField = document.getElementById(
  "session-user-answer-field"
);
const sessionUserWrongAnswerField = document.getElementById(
  "session-user-wrong-answer-field"
);
const sessionTrueAnswerField = document.getElementById(
  "session-true-answer-field"
);
const sessionUserAttemptsField = document.getElementById(
  "session-user-attempts-amount-field"
);

//inisialisasi fungsi untuk menghasilkan jawaban permainan
function getAnswer() {
  let answer = "123".split("");
  for (let i = 0; i < answer.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = answer[i];
    answer[i] = answer[j];
    answer[j] = tmp;
  }
  return answer.join('');
}

//menampilkan key di session storage
const sessionAnswerKey = "SESSION_ANSWER";
const sessionUserAttemptsKey = "SESSION_USER_ATTEMPTS";
const sessionUserIsPlayingKey = "SESSION_USER_IS_PLAYING";

//inisialisasi key untuk local storage
const localTotalVictoryKey = "LOCAL_TOTAL_VICTORIES_PLAYED";
const localMaximunAttemptsKey = "LOCAL_MAXIMUN_ATTEMPTS";

window.addEventListener("load", function () {
  if (typeof Storage !== undefined) {
    // inisialisasi semua item web storage yang kita akan gunakan jika belum ada
    if (sessionStorage.getItem(sessionAnswerKey) === null) {
      sessionStorage.setItem(sessionAnswerKey, "");
    }
    if (sessionStorage.getItem(sessionUserAttemptsKey) === null) {
      sessionStorage.setItem(sessionUserAttemptsKey, 0);
    }
    if (sessionStorage.getItem(sessionUserIsPlayingKey) === null) {
      sessionStorage.setItem(sessionUserIsPlayingKey, false);
    }
    if (localStorage.getItem(localTotalVictoryKey) === null) {
      localStorage.setItem(localTotalVictoryKey, 0);
    }
    if (localStorage.getItem(localMaximunAttemptsKey) === null) {
      localStorage.setItem(localMaximunAttemptsKey, 0);
    }
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
  }

  //inisialisasi semua nilai field pada dokumen yang menggunakan nilai dari web storage
  sessionUserAttemptsField.innerText = sessionStorage.getItem(
    sessionUserAttemptsKey
  );
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
  localMaximumAttemptField.innerText = localStorage.getItem(
    localMaximunAttemptsKey
  );
});

//mengaktifkan tombol bermain dan menghapus atribut hidden dan memasukkan function getAnswer() kedalam session storage dan nilainya true
playButton.addEventListener('click', function () {
  sessionStorage.setItem(sessionAnswerKey, getAnswer());
  sessionStorage.setItem(sessionUserIsPlayingKey, true);
  beforeGameDisplay.setAttribute("hidden", true);
  duringGameDisplay.removeAttribute("hidden");
});


//Membuat fungsi tombol saat ditekan bisa tampil pada span id sessionUserAnswerField dan juga melakukan apakah angkanya sesuai dengan fungsi CheckAnswer() yang mengambil nilai dari session storage dengan key
answerButton1.addEventListener('click', function () {
  sessionUserAnswerField.innerText += '1';
  if (sessionUserAnswerField.innerText.length == 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

answerButton2.addEventListener('click', function () {
  sessionUserAnswerField.innerText += '2';
  if (sessionUserAnswerField.innerText.length == 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

answerButton3.addEventListener('click', function () {
  sessionUserAnswerField.innerText += '3';
  if (sessionUserAnswerField.innerText.length == 3) {
    checkAnswer(sessionUserAnswerField.innerText);
  }
});

//fungsi melakukan pengecekan jawabanya apakah benar, jika jawabannya benar method duringGameDisiplay atribut hidden nya akan berfungsi dan method afterGameDisplay nya akan dihapus atribut hidden nya dan akan tampil jawabannya
function checkAnswer(userGuess) {
  const answer = sessionStorage.getItem(sessionAnswerKey);
  if (userGuess == answer) {
    duringGameDisplay.setAttribute("hidden", true);
    afterGameDisplay.removeAttribute("hidden");
    sessionTrueAnswerField.innerText = answer;
    updateScore();
  } else {
    const previousAttemptAmount = parseInt(
      sessionStorage.getItem(sessionUserAttemptsKey)
    );
    //jika jawabannya salah maka akan diset didalam session storage dengan key "sessionUserAttemptsKey" bertambah 1
    sessionStorage.setItem(sessionUserAttemptsKey, previousAttemptAmount + 1);
    //dan akan diambil key nya dan ditampilkan pada elemen dengan id="session-user-attempts-amount-field"
    sessionUserAttemptsField.innerText = sessionStorage.getItem(
      sessionUserAttemptsKey
    );
    //dikosongkan jawabannya jika salah
    sessionUserAnswerField.innerText = "";
    //dimasukkan jumlah salahnya
    sessionUserWrongAnswerField.innerText = userGuess;
  }
}

//belum paham
function updateScore() {
  const sessionAttemptValue = parseInt(
    sessionStorage.getItem(sessionUserAttemptsKey)
  );
  const localAttemptsValue = parseInt(
    localStorage.getItem(localMaximunAttemptsKey)
  );
  if (sessionAttemptValue > localAttemptsValue) {
    localStorage.setItem(localMaximunAttemptsKey, sessionAttemptValue);
    localMaximumAttemptField.innerText = sessionAttemptValue;
  }
  const previousTotalVictoryAmount = parseInt(localStorage.getItem(localTotalVictoryKey));
  localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount + 1);
  localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey)
}

window.addEventListener('beforeunload', function() {
  sessionUserAnswerField.innerText = '';
  sessionUserWrongAnswerField.innerText = '';
  sessionStorage.setItem(sessionUserAttemptsKey, 0);
  sessionUserAttemptsField.innerText = sessionStorage.getItem(sessionUserAttemptsKey)
});

destroyDataButton.addEventListener('click', function() {
  sessionStorage.removeItem(sessionAnswerKey);
  sessionStorage.removeItem(sessionUserAttemptsKey);
  // sessionStorage.removeItem(sessionUserIsPlayingKey);
  localStorage.removeItem(localTotalVictoryKey);
  localStorage.removeItem(localMaximunAttemptsKey);
  alert('refresh halaman ini kembali');
});






