function voice(){
        let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.mozSpeechRecognition);
        recognition.lang = "en-GB";
        let music_input = document.getElementById("music-search");
        let mic_button = document.getElementById("mic");
        
        mic_button.addEventListener("click",()=>{
            music_input.placeholder = 'Listening...';
            recognition.start();
        })
        
        recognition.onresult= function(event){
            const speech = event.results[0][0].transcript
            music_input.value = `${speech}`;
        };

        }
function hideShowPass() {
    let passText = document.getElementById('pass');
    let showBtn = document.getElementById('hide1');
    let hideBtn = document.getElementById('hide2');

    if (passText.type === 'password') {
        passText.type = 'text';
        showBtn.style.display = 'block';
        hideBtn.style.display = 'none';

   } else {
        passText.type = 'password';
        showBtn.style.display = 'none';
        hideBtn.style.display = 'block';
}

}
function checkStrengthAndValidate() {
    const pass = document.getElementById('pass');
    const strength = document.getElementById('strength');
    const strengthText = document.getElementById('strength-text');
    const requirementList = document.querySelectorAll('.rules li');

    if (pass.value.length > 0) {
        strength.style.display = 'block';

        if (pass.value.length < 6) {
            strengthText.innerHTML = 'Weak';
            strength.style.color = 'red';
        }
        if (pass.value.length >= 6) {
            strengthText.innerHTML = 'Medium'; strength.style.color = 'red';
        }
        if (pass.value.length >= 8) {
            strengthText.innerHTML = 'Good'; strength.style.color = 'rgb(4, 113, 238)';
        }
        if (pass.value.length >= 10) {
            strengthText.innerHTML = 'Very Strong'; strength.style.color = 'green';
        }
    }
    else {
        strength.style.display = 'none';
    }

    const requirements = [
        { regex: /.{8,}/, index: 0 }, //minimum 8 chars
        { regex: /[0-9]/, index: 1 }, // atleast one number
        { regex: /[a-z]/, index: 2 }, // atleast one lowercase letter
        { regex: /[^A-Za-z0-9]/, index: 3 }, // atleast one spacial character
        { regex: /[A-Z]/, index: 4 }, // atleast one uppercase letter
    ];

    requirements.forEach(item => {
        const isValid = item.regex.test(pass.value);
        const requirementItem = requirementList[item.index];
        if (isValid) {
            requirementItem.firstElementChild.classList.add('fa-check');
            requirementItem.firstElementChild.classList.remove('fa-circle');
            requirementItem.classList.add('valid');

        } else {
            requirementItem.firstElementChild.classList.add('fa-circle');
            requirementItem.firstElementChild.classList.remove('fa-check');
            requirementItem.classList.remove('valid');
        }
    });

}

function playSong(div) {
    let songUrl = div.getAttribute('data-song-url');
    let imageurl = div.getAttribute('data-image-url');
    let img = document.querySelector('img');
    let SongImage = document.getElementById('SongImage');
    let audio = document.querySelector('audio');

   
    if (audio) {
        audio.pause();
        audio.src = ""; 
    }
    if (!audio) {
        audio = document.createElement('audio');
        audio.setAttribute('controls', 'controls'); 
        document.body.appendChild(audio); 
    }
    audio.src = songUrl;
    SongImage.src = imageurl;
    audio.play();
}

function fadeOut(element) {
    let opacity = 1;  
    const timer = setInterval(function() {
      if (opacity <= 0.1) {
        clearInterval(timer);
        element.style.display = 'none';
      }
      element.style.opacity = opacity;
      opacity -= opacity * 0.1;
    }, 30);
  }

setTimeout(function() {
    const flashMessage = document.getElementById('flash-message');
    if (flashMessage) {
        fadeOut(flashMessage)
    }
  }, 3000);

 