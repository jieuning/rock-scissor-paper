const HANDS = ['rock', 'scissor', 'paper'];

const WINS = {
  rock: 'scissor',
  scissor: 'paper',
  paper: 'rock',
};

export function compareHand(a, b) {
  if (WINS[a] === b) return 1;
  if (WINS[b] === a) return -1;
  return 0;
}

// 1~n까지 랜덤으로 숫자를 반환
function random(n) {
  return Math.floor(Math.random() * n);
}

// 가위바위보 중 랜덤으로 반환
export function generateRandomHand() {
  const idx = random(HANDS.length);
  return HANDS[idx];
}