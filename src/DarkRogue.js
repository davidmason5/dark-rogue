import React, {useRef, useEffect, useState} from 'react';
import InputManager from './InputManager.js';
import Player from './Player.js';
import Spawner from './Spawner.js';
import World from './World.js';

const DarkRogue = ({width, height, tilesize}) => {
    const canvasRef = useRef(); //hook
   // const [player, setPlayer] = useState(new Player(1,2,tilesize)); 
    const [world, setWorld] = useState(new World(width, height, tilesize));
    let inputManager = new InputManager();

    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`);
        
        let newWorld = new World();
        Object.assign(newWorld, world);
        newWorld.movePlayer(data.x, data.y);
        setWorld(newWorld);
    };

    useEffect(() => {
        console.log("Create Map");

        let newWorld = new World();
        Object.assign(newWorld, world);
        newWorld.createCellularMap();
        newWorld.moveToSpace(world.player);
        let spawner = new Spawner(newWorld);
        spawner.spawnLoot(10);
        spawner.spawnMonsters(6);
        setWorld(newWorld);
    },[]);

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
        world.draw(ctx);
    });

    return (
   <>
    <canvas 
        ref={canvasRef}
        width={width * tilesize}
        height={height * tilesize}
        style={{border: '3px solid black', background: 'dimgrey'}}
    ></canvas>
    <ul>
        {world.player.inventory.map((item,index) => (
        <li key={index}>{item.attributes.name}</li>
        ))}
    </ul>

    <ul>
        {world.history.map((item,index) => (
        <li key={index}>{item}</li>
        ))}
    </ul>
    </>
    );
};

export default DarkRogue;