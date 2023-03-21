import { useState } from 'react';
import './App.css';
import HandIcon from './components/HandIcon';
import Button from './components/Button';
import HandButton from './components/handButton/HandButton';
import { compareHand, generateRandomHand } from './components/Utils'
import resetIcon from './assets/ic-reset.svg'


//상수로 지정하여 초기값 변경 용이하게
const initial_value = 'rock';

//누가 이겼는지 결과값 표시
function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App() {

  const [hand, setHand] = useState(initial_value);
  const [otherHand, setOtherHand] = useState(initial_value);
  const [gameHistory, setGameHistory] = useState([]); //getResult 승부결과를 arry로 받아서 넘겨줌
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  //버튼 클릭시 이벤트
  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  }

  //클릭시 초기값으로 되돌아감
  const handleClearClick = () => {
    setHand(initial_value);
    setOtherHand(initial_value);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  }

  //배점 input값 변경
  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  }

  //버튼 클릭시 handleClick함수 실행
  //onClick props를 value값으로 실행
  //콘솔로 value값 출력
  //해당 문자열 출력
  return (
    <div className="container">
      <ul className='game-box'>
        <h1>가위바위보</h1>
        <li>
          <Button onClick={handleClearClick}>
            <img className='reset-img' src={resetIcon} />
          </Button>
        </li> {/* 초기화 버튼 끝 */}
        <li>
          <div className='score'>
            <div className='score-num'>
              {score}
            </div>
            <span className='score-name'>나</span>
          </div>
          <span className='colon'>:</span>
          <div className='score'>
            <div className='score-num'>
              {otherScore}
            </div>
            <span className='score-name'>상대</span>
          </div>
        </li> {/* 현재 스코어 끝 */}
        <li className='Box-inner'>
          <div className='versus'>
            <div className='hand'>
              <HandIcon className="hand-icon" value={hand} />
            </div>
            <span>vs</span>
            <div className='hand'>
              <HandIcon className="hand-icon" value={otherHand} />
            </div>
          </div> {/* 핸드 아이콘 끝 */}
          <div className='bet'>
            <span>배점</span>
            <input type="number" value={bet} min={1} max={9} onChange={handleBetChange}></input>
            <span>배</span>
          </div>
          <div className='history'>
            <h2>승부기록</h2>
            {gameHistory.join(',')}
          </div>
        </li> {/* 박스 이너 끝 */}
        <li>
          <div>
            <HandButton value="rock" onClick={handleButtonClick} />
            <HandButton value="scissor" onClick={handleButtonClick} />
            <HandButton value="paper" onClick={handleButtonClick} />
          </div>
        </li> {/* 가위바위보 버튼 끝 */}
      </ul>
    </div>
  );
}

export default App;
