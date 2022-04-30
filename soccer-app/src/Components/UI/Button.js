import './Button.css'

function Button(props) {
    const classes = 'button ' + props.className;
    return (
        <button  onClick={props.onClick} className={classes}>{props.children}</button>
    );
}

export default Button;