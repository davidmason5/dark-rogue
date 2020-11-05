import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager.js';

const DarkRogue = ({width, height, tilesize}) => {
    const canvasRef = useRef(); //hook
    const [player, setPlayer] = useState({x:64, y:128}); 

    let inputManager = new InputManager();

    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`);
        let newPlayer = {...player};
        newPlayer.x += data.x * tilesize;
        newPlayer.y += data.y * tilesize;
        setPlayer(newPlayer);
    };

    useEffect(() => {
        console.log('Bind input');
        inputManager.bindKeys();
        inputManager.subscribe(handleInput);
        return () => {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        };
    });

    useEffect(() => {
        console.log('Draw');
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0,0,width*tilesize,height*tilesize);
        ctx.fillStyle = '#000'
        ctx.fillRect(player.x, player.y, 16, 16);
    });

    return(
    <canvas 
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{border: '3px solid black'}}>
    </canvas>
    );
};

export default DarkRogue;