import '../App.css'

//children - 부모 컴포넌트에 props를 보내지 않아도 일반 버튼 태그처럼 값을 넣을 수 있음
function Button({ children, onClick }) {

    return (
        <button className='reset-button' onClick={onClick}>
            {children}
        </button>
    )}

export default Button;