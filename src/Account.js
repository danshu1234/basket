import React, { useRef, useState } from "react";
function Account (props) {
let entrance;
const [warning, setWarning] = useState(null)
const input = useRef(null)
const [showEntrence, setShowEntrance] = useState(true)
if (showEntrence == true) {
    entrance = 'Введите свое имя, чтобы мы могли к вам обращаться!'
}
return (
    <div>
        <h2>Ваше имя: {props.user.current}</h2>
        <h4>{entrance}</h4>
        <input placeholder="Ваше имя" onChange={(event) => {
            props.user.current = event.target.value
            input.current = event.target.value
        }}/>
        <button onClick={() => {
            if (input.current !== null && input.current !== '') {
                props.setState(props.state + 1)
                setWarning(null)
                setShowEntrance(false)
            } else {
                 setWarning('Введите свое имя')
            }
        }}>Сохранить</button>
        <h5>{warning}</h5>
    </div>
)
}
export default Account