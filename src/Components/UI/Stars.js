import './Stars.css'

function Stars(props) {
    const starsCount = Math.floor(props.stars);
    const hasHalfStar = props.stars - starsCount > 0;
    const starsDisplay = [];
    if(hasHalfStar) {
        starsDisplay.push( <img alt='' key='6' className='star' src= {process.env.PUBLIC_URL + 'half-star.png'}></img>)
    }

    for(let i =0 ; i< starsCount;i++){
        starsDisplay.push( <img alt='' key={i} className='star' src='https://cdn-icons-png.flaticon.com/512/276/276020.png'/>  );
    }

    return (
        <>
            {starsDisplay}
        </>
    )
}

export function SingleStar(props) {

    const classes = 'star ' + props.className;
    return (
        <>
            <img alt='' key='6' className={classes} src= {process.env.PUBLIC_URL + 'https://cdn-icons-png.flaticon.com/512/276/276020.png'}></img>
        </>
    )
}


export default Stars;