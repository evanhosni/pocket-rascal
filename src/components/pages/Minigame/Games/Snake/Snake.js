import React, { useEffect, useState, useRef, useCallback } from 'react';
import './snake.css';

const SnakeMini = (props) => {

    const [dim, setDim] = useState(0);
    const [chunk, setChunk] = useState(0);
    const [direction, setDirection] = useState('right');
    const [fruit, setFruit] = useState(26);
    const [points, setPoints] = useState(0);
    const [game, setGame] = useState(false);
    const speedRef = useRef(100);
    let width;
    const [snake, setSnake] = useState([
        {
            direction: 'right',
            part: [186, 185, 184, 183]
        }
    ]);

    const reset = () => {
        props.setUserCoins(props.userCoins + points)
        speedRef.current = 100;
        setPoints(0)
        setDirection('right')
        setSnake([{
            direction: 'right',
            part: [186, 185, 184, 183]
        }])
        setGame(false)
    }

    const pieces = () => {//functionally label snake pieces (bang) and return
        let arr = [];
        for (let i = 0; i < 400; i++) {
            let addToArr = false;
            let j = 0;
            while (j < snake.length) {
                if (snake[j].part.indexOf(i) >= 0) {
                    addToArr = true
                    break;
                } else {
                    addToArr = false
                }
                j++
            }
            addToArr ?
                arr.push('bang') :
                i === fruit ? arr.push('fruit') :
                    arr.push('')
        }
        return arr
    }

    //handle direction changes
    const turn = useCallback(
        (dir, opp) => {
            let tempSnake = [...snake];
            console.log(snake[0].part)
            if (snake[0].part.length > 0 && direction !== opp && direction !== dir) {
                setDirection(dir)
                tempSnake.unshift({
                    direction: dir,
                    part: []
                })
                setSnake(tempSnake)
            }
        }, [snake, direction]
    )

    useEffect(() => {
        //determine relative dimensions of game portal
        width = window.innerWidth;
        if (width >= 800) {
            setDim(width * .35)
        } else if (width < 800) {
            setDim(width * .9);
        }
        setChunk(dim / 20)

        //points and get longer after eating
        if (snake[0].part[0] === fruit) {
            setPoints(points + 1)
            let sneak = [...snake];
            let firstSection = sneak[0]
            if (firstSection.direction === 'up') {
                let y = firstSection.part[0] - 20;
                if (y < 0) {
                    firstSection.part.unshift(y + 400);
                } else {
                    firstSection.part.unshift(y)
                }
            } else if (firstSection.direction === 'right') {
                let y = firstSection.part[0] + 1;
                if (y % 20 === 0) {
                    firstSection.part.unshift(y + - 20);
                } else {
                    firstSection.part.unshift(y)
                }
            } else if (firstSection.direction === 'down') {
                let y = firstSection.part[0] + 20;
                if (y >= 400) {
                    firstSection.part.unshift(y - 400);
                } else {
                    firstSection.part.unshift(y)
                }
            } else if (firstSection.direction === 'left') {
                let y = firstSection.part[0] - 1;
                if (y % 20 === 19) {
                    firstSection.part.unshift(y + 20);
                } else {
                    firstSection.part.unshift(y)
                }
            }
            speedRef.current = speedRef.current - 2
            setSnake(sneak)
            setFruit(Math.floor(Math.random() * Math.floor(400)))
        }

        //gameover if you eat your tail
        let totalArr = [];
        for (let k = 0; k < snake.length; k++) {
            totalArr = [...totalArr, ...snake[k].part]
        }
        let head = snake[0].part[0];
        totalArr.filter(item => item === head).length >= 2 && setGame(true)

        if (!game) {//if GAMEOVER pause events

            //listen for directions and update snake instructions accordingly
            const handleKeydown = (e) => {
                //let tempSnake: any = [...snake];
                switch (e.code) {
                    case 'ArrowUp':
                        e.preventDefault();
                        turn('up', 'down')
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        turn('right', 'left')
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        turn('down', 'up')
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        turn('left', 'right')
                        break;
                    default:
                }
            }
            document.addEventListener('keydown', handleKeydown)



            //event interval
            const interval = setInterval(() => {

                //handle snake piece movement
                let dupSneak = [...snake];

                for (let i = (snake.length - 1); i > 0; i--) {//increment through current snake and reduce to head direction
                    if (dupSneak[i].part.length !== 0) {
                        let next = dupSneak[i - 1];
                        let chunk = dupSneak[i].part.shift();
                        next.part.push(chunk)
                    } else {
                        dupSneak.pop()
                    }
                }

                //perform movement changes to each chunk
                let sneak = dupSneak;
                sneak.map((section) => {
                    if (section.direction === 'right') {
                        section.part.map((x, i) => {
                            let y = x + 1;
                            if (y % 20 === 0) {
                                return section.part[i] = y - 20;
                            } else {
                                return section.part[i] = y
                            }
                        })
                    } else if (section.direction === 'up') {
                        section.part.map((x, i) => {
                            let y = x - 20;
                            if (y < 0) {
                                return section.part[i] = y + 400;
                            } else {
                                return section.part[i] = y
                            }
                        })
                    } else if (section.direction === 'left') {
                        section.part.map((x, i) => {
                            let y = x - 1;
                            if (y % 20 === 19) {
                                return section.part[i] = y + 20;
                            } else {
                                return section.part[i] = y
                            }
                        })
                    } else if (section.direction === 'down') {
                        section.part.map((x, i) => {
                            let y = x + 20;
                            if (y >= 400) {
                                return section.part[i] = y - 400;
                            } else {
                                return section.part[i] = y
                            }
                        })
                    }
                    return ''
                })
                setSnake(sneak)

            }, speedRef.current);

            //remove interval and listeners
            return () => {
                clearInterval(interval)
                document.removeEventListener('keydown', handleKeydown)
            };
        }
    }, [turn, width, dim, chunk, snake, direction, points, fruit, game])


    //update state of earned coins when points value changes
    // useEffect(() => {
    //     props.setEarnedCoins(props.earnedCoins + 1)
    // }, [points])


    //at game end - if play a different minigame, refresh page for random selection
    function refreshPage() {
        //update user coins before page reload
        props.setUserCoins(props.userCoins + points)
        window.location.reload(false);
    }

    return (
        <div className="snake-container" id="snake-container">
            <div
                className="game-border"
                style={{ width: dim, height: dim, backgroundColor: props.backgroundColor }}
            >
                {
                    pieces().map((piece, i) => {
                        return <div
                            key={'piece' + i}
                            style={piece === 'bang' ?
                                { width: chunk, height: chunk, backgroundColor: props.color1 } :
                                piece === 'fruit' ?
                                    { width: chunk, height: chunk, backgroundColor: props.color2 } :
                                    { width: chunk, height: chunk }}
                        >
                        </div>
                    })
                }
                {
                    game && <div
                        className="game-splash"
                        style={{ height: dim }}
                    >
                        <div>Game Over!</div>
                        <button
                        onClick={() => reset()}>
                            Play Again
                        </button>
                        <button 
                        onClick={() => {
                        props.handlePageChange('Minigame'); 
                        props.setUserCoins(props.userCoins+points);
                        props.setEarnedCoins(props.earnedCoins+points)
                        }}>
                            Play Another Game</button>
                        <button 
                        onClick={() => {
                        props.handlePageChange('Dashboard');
                        props.setUserCoins(props.userCoins+points)}}>
                            Exit
                        </button>
                    </div>
                }
            </div>
            <div
                className="point-bar"
                style={{ width: dim }}
            >
                <div style={{ color: props.color1 }}>Score: {points}</div>
            </div>
            {
                <div
                    className="snake-mobile-buttons"
                    style={{ width: dim, margin: 'auto' }}
                >
                    <div>
                        <button
                            onClick={() => turn('up', 'down')}
                        >&#8593;</button>
                    </div>
                    <div>
                        <button
                            onClick={() => turn('left', 'right')}
                        >&#8592;</button>
                        <button
                            onClick={() => turn('right', 'left')}
                        >&#8594;</button>
                    </div>
                    <div>
                        <button
                            onClick={() => turn('down', 'up')}
                        >&#8595;</button>
                    </div>
                </div>
            }
        </div>
    )
}



export default SnakeMini;