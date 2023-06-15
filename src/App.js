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
  const [gameHistory, setGameHistory] = useState([]); 
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);
  console.log(bet);

  //가위바위보 버튼 클릭시 실행될 이벤트
  //버튼 클릭시 handleClick함수 실행
  //onClick 함수를 value값으로 실행
  //handleButtonClick함수 nextHand 파라미터로 전달
  //문자열로 출력
  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);

    // 배열은 참조형이기때문에 state에 함수로 값을 변경할 때 새로운 값을 만들어줘야함
    // 그래서 새로운 배열을 만들어 변경해 줌
    setGameHistory([...gameHistory, nextHistoryItem]);

    // 스코어와 배점을 합한 값
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  }

  //클릭시 전부 초기값으로 되돌아감
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
    // value 값이 문자형이기 때문에 숫자형으로 변환
    let num = Number(e.target.value);
    // 1과 9 사이의 숫자로 만들어 줌
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  }

  return (
    <div className="container">
      <ul className='game-box'>
        <h1>가위바위보</h1>
        {/* 초기화 버튼 */}
        <li>
          <Button onClick={handleClearClick}>
            <img className='reset-img' src={resetIcon} />
            <h2 className='hidden'>초기화 버튼</h2>
          </Button>
        </li>

        {/* 현재 스코어 */}
        <li>
          <h2 className='hidden'>현재 스코어</h2>
          {/* 나의 스코어 */}
          <div className='score'>
            <h2 className='hidden'>나의 스코어</h2>
            <div className='score-num'>
              {score}
            </div>
            <span className='score-name'>나</span>
          </div>

          <span className='colon'>:</span>

          {/* 상대(컴퓨터)의 스코어 */}
          <div className='score'>
            <h2 className='hidden'>상대 스코어</h2>
            <div className='score-num'>
              {otherScore}
            </div>
            <span className='score-name'>상대</span>
          </div>
        </li>
        <li className='Box-inner'>

          {/* 핸드 아이콘 */}
          <div className='versus'>
            <h2 className='hidden'>핸드 아이콘</h2>

            {/* 나의 핸드 아이콘 */}
            <div className='hand'>
              <HandIcon className="hand-icon" value={hand} />
            </div>

            <span>vs</span>

            {/* 상대(컴퓨터) 핸드 아이콘 */}
            <div className='hand'>
              <HandIcon className="hand-icon" value={otherHand} />
            </div>
          </div>

          {/* 배점 1부터 최대 9까지 가능 */}
          <div className='bet'>
            <h2 className='hidden'>베점 1부터 9까지 올릴 수 있습니다</h2>
            <span>배점</span>
            <input type="number" value={bet} min={1} max={9} onChange={handleBetChange} />
            <span>배</span>
          </div>

          {/* 승부기록 */}
          <div className='history'>
            <h2>승부기록</h2>

            {/* join - 전달받은 값을 하나의 문자열로 만들어주는 메소드 */}
            {gameHistory.join(',')}
          </div>
        </li>

        {/* 가위바위보 버튼 */}
        <li>
          <h2 className='hidden'>가위바위보 선택 버튼</h2>
          <div>
            <HandButton value="rock" onClick={handleButtonClick} />
            <HandButton value="scissor" onClick={handleButtonClick} />
            <HandButton value="paper" onClick={handleButtonClick} />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
