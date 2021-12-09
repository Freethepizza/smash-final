import * as THREE from "./dependencies/three.module.js";
import {OrbitControls} from "./dependencies/OrbitControls.js";
import { Kitchen,mixer } from "./components/kitchen.js";
import { Burger, burgerMixer } from "./components/burger.js";
import { Rapper, rapperMixer } from "./components/rapper.js";
import { Gamer, gamerMixer } from "./components/gamer.js";
import { Muppie, muppieMixer } from "./components/muppie.js";
import { Skater, skaterMixer } from "./components/skater.js";
import { Chef } from "./components/chef.js";
import { Game } from "./game.js";
import { collisionUpdater, helperStart, helperEnd, helperSmash, helperLeft, helperRight, helperBurger,helperRapper,helperMuppie,helperGamer,helperSkater,boxBurger,boxRapper,boxMuppie,boxGamer,boxSkater,boxRight,boxLeft,boxSmash } from "./hitboxes.js";
//Scene
const scene = new THREE.Scene();
//Load Manager
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
    scene.add(burger,rapper,gamer,muppie,skater,helperSmash/*helperStart,helperEnd,helperLeft,helperRight,helperBurger,helperRapper,helperMuppie,helperSkater*/);
    game.level1()
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    var percent = itemsLoaded/itemsTotal
    console.log(percent*100 + ' %')
};
manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

const raycaster = new THREE.Raycaster(new THREE.Vector3(0, -1, 0),new THREE.Vector3(0, 1, 2.8));


/*const arrow = new THREE.ArrowHelper( new THREE.Vector3(0, 1, 0),new THREE.Vector3(0, 1, 2.8), 1, Math.random() * 0xffffff );
scene.add( arrow );*/
//Ambient Light

var light = new THREE.HemisphereLight(0x404040,0xFFFFFF , .8);
scene.add(light);

var light2 = new THREE.DirectionalLight(0xFFFFFF, 1.2);
light2.position.set(1,2,1)
scene.add(light2);

var light3 = new THREE.DirectionalLight(0xFFFFFF, 1);
light3.position.set(0,1,0)
scene.add(light3);



//Camera
const width = 5;
const height = width * (window.innerHeight/window.innerWidth);
const camera = new THREE.OrthographicCamera(width / -2,width / 2,height / 2,height / -2, 1, 100);
camera.position.set(.2,3,5);
camera.lookAt(0,0,0);

//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);

//Clock
var clock = new THREE.Clock();
var delta = 0;

//OrbitControls
var controls = new OrbitControls( camera, renderer.domElement );
let previousTime = 0;

//Instances
const kitchen = new Kitchen(manager,scene);
const burger = new Burger(manager);
const rapper = new Rapper(manager);
const gamer = new Gamer(manager);
const muppie = new Muppie(manager);
const skater = new Skater(manager);
const chef = new Chef(manager);
const game = new Game(burger,rapper,gamer,muppie,skater);
//Instances


const intersects = raycaster.intersectObjects(scene.children);

//Updater
const tick = function() {


	for ( let i = 0; i < intersects.length; i ++ ) {
		console.log(intersects[i]);
	}
    controls.update()
    delta = clock.getDelta();
    requestAnimationFrame(tick);
    render();
    document.getElementById("score").innerText = game.score;
    document.getElementById("lifes").innerText = game.lifes;
    boxBurger.setFromObject(burger);
    boxRapper.setFromObject(rapper);
    boxMuppie.setFromObject(muppie);
    boxGamer.setFromObject(gamer);
    boxSkater.setFromObject(skater);

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    collisionUpdater(kitchen,burger,rapper,muppie,gamer,skater)

    //MIXERS UPDATERS
    if(mixer!==null){
        mixer.update(delta*2.25)
    }
    if(burgerMixer!==null){
        burgerMixer.update(delta)
    }
    if(rapperMixer!==null){
        rapperMixer.update(delta*1.3)
    }
    if(muppieMixer!==null){
        muppieMixer.update(delta)
    }
    if(gamerMixer!==null){
        gamerMixer.update(delta)
    }
    if(skaterMixer!==null){
        skaterMixer.update(delta)
    }
}

document.querySelector('.smash').addEventListener('click', ()=>{
    if(kitchen){
    kitchen.play()
    }
    if(kitchen.isIronEmpty){
        game.lifes-=1;
        game.checkLifes();
    }else{
        if(burger.inIron){
            console.log('burger hit!!!');
            game.score+=burger.points;
            burger.smashed=true;
        }else if(rapper.inIron){
            console.log('rapper hit!!!');
            game.score+=rapper.points;
            rapper.smashed=true;
        }else if(muppie.inIron){
            console.log('muppie hit!!!');
            game.score+=muppie.points;
            muppie.smashed = true;
        }else if(gamer.inIron){
            console.log('gamer hit!!!');
            game.score+=gamer.points;
            gamer.smashed=true;
        }else if(skater.inIron){
            console.log('skater hit!!!');
            game.score+=skater.points;
            skater.smashed=true;
        }
    }
    if(game.over){
        game.gameOverSfx();
        document.querySelector(".gameover").style = 'display:block';
        document.querySelector(".smash").style = 'display:none';
    }
})

const render = () => {renderer.render(scene,camera)}
tick();
document.getElementById('game').appendChild(renderer.domElement)
