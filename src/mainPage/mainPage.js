import { useNavigate } from "react-router-dom";
import './style.css'

function Main() {

  let navigate = useNavigate();

  return (
    <div className="main-wrap">

      {/* 메인 타이틀 */}
      <h1 className="main-title">SRP GAME</h1>

      {/* 핸드 아이콘 */}
      <div className="main-hand-icon">
        <h2 className="hidden">핸드 아이콘</h2>
      </div>

      {/* 게임 시작 버튼 */}
      <button className="start-btn" onClick={() => navigate('/detail')}>
        START
      </button>
    </div>
  )
}

export default Main;