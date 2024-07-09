import './style.css';

// Получаем контейнер для игрового поля
const gameContainer = document.querySelector('.game-container');

// Количество отверстий (лунок)
const numHoles = 16;

// Создаем и добавляем отверстия в контейнер
for (let i = 1; i <= numHoles; i++) {
  const hole = document.createElement('div');
  hole.classList.add('hole');
  hole.id = `hole${i}`;
  gameContainer.appendChild(hole);
}


document.addEventListener( 
	"DOMContentLoaded", function () { 
	const holes = 
		document.querySelectorAll(".hole"); 
	const startButton = 
		document.getElementById("startButton"); 
	const endButton = 
		document.getElementById("endButton"); 
	const scoreDisplay = 
		document.getElementById("score"); 
	const timerDisplay = 
		document.getElementById("timer"); 

	let timer; 
	let score = 0; 
	let countdown; 
	let moleInterval; 
	
	// Set the initial state to game over 
	let gameOver = true;
  let lifecounter = Number(document.getElementById("life").innerText);

	function comeout() { 
		holes.forEach(hole => {
      if (hole.classList.contains('mole')) {
        hole.classList.remove('mole')
        if (lifecounter > 0) {
          lifecounter--;
          document.getElementById("life").innerText = lifecounter;
        } else {
          document.getElementById("life").innerText = "0";
          endGame();
        }
      }
			// hole.classList.remove('mole'); 
			hole.removeEventListener( 
				'click', handleMoleClick); 
		});
    if (!gameOver) {
      let random = holes[Math.floor(Math.random() * 16)]; 
      random.classList.add('mole');
      random.addEventListener('click', handleMoleClick); 
    } 
	} 

	function handleMoleClick() { 
		if (!gameOver) { 
			score++; 
			scoreDisplay.textContent = `Score: ${score}`; 
		} 
		this.classList.remove('mole'); 
	} 

	function startGame() { 
		if (!gameOver) { 
		
			// Prevent starting the game 
			// again if it's already in progress 
			return; 
		} 
    
		gameOver = false; 
		score = 0; 
		scoreDisplay.textContent = `Score: ${score}`; 
		timer = 60; 
		timerDisplay.textContent = `Time: ${timer}s`; 

		startButton.disabled = true; 
		endButton.disabled = false; 

		countdown = setInterval(() => { 
			timer--; 
			timerDisplay.textContent = `Time: ${timer}s`; 

			if (timer <= 0) { 
				endGame()
			} 
		}, 1000); 

		moleInterval = setInterval(() => { 
			if (!gameOver) comeout(); 
		}, 1000); 

		console.log("Game started"); 
	} 

	function endGame() { 
		clearInterval(countdown); 
		clearInterval(moleInterval); 
		gameOver = true; 
		alert(`Game Ended!\nYour final score: ${score}`);
		score = 0; 
		timer = 60; 
		scoreDisplay.textContent = `Score: ${score}`; 
		timerDisplay.textContent = `Time: ${timer}s`; 
		startButton.disabled = false; 
		endButton.disabled = true;
    holes.forEach(hole => {
      hole.classList.remove('mole');
      hole.removeEventListener(
        'click', handleMoleClick);
    });
    lifecounter = 5;
    document.getElementById("life").innerText = lifecounter;
	} 

	startButton.addEventListener("click", startGame); 
	endButton.addEventListener("click", endGame); 
});

