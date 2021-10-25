const mario = document.querySelector('.mario');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 40;

function handleKeyUp(event) {
  const musicJump = new Audio('smb_jump-super.wav');
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
      musicJump.play();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 190) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 40) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 60;
          mario.style.bottom = position + 'px';
        }
      }, 50);
    } else {
      // Subindo
      position += 60;
      mario.style.bottom = position + 'px';
    }
  }, 50);
}

function refreshPage(){
  window.location.reload();
}

function createBullet() {
  const bullet = document.createElement('div');
  const musicDie = new Audio('smb_mariodie.wav');
  let bulletPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  bullet.classList.add('bullet');
  background.appendChild(bullet);
  bullet.style.left = bulletPosition + 'px';

  let leftTimer = setInterval(() => {
    if (bulletPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(bullet);
    } else if (bulletPosition > 0 && bulletPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      musicDie.play();
      document.body.innerHTML = '<h1 class="game-over">GAME OVER</h1><button class="game-over2" type="submit" onClick="refreshPage()">Play Again</button>';
      
    } else {
      bulletPosition -= 10;
      bullet.style.left = bulletPosition + 'px';
    }
  }, 20);

  setTimeout(createBullet, randomTime);
}

createBullet();
document.addEventListener('keyup', handleKeyUp);
