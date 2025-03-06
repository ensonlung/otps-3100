interface ButtonProp{
    text: string;
    onButtonClick: () => void;
}

const Button = ({text, onButtonClick}: ButtonProp) => {
    return <button type="button" className="btn btn-primary" onClick={onButtonClick}> {text} </button>
};

export default Button;
