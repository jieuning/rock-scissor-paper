import HandIcon from "../HandIcon";
import "./HandButton.css"


function HandButton({ value, onClick }) {

    const handleClick = () => onClick(value);

    return( 
        <button className="handButton" onClick={handleClick}>
            <HandIcon className="handButton-icon" value={value}/>
        </button>
    )
}

export default HandButton;
