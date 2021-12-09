import * as THREE from "./dependencies/three.module.js";
import {OrbitControls} from "./dependencies/OrbitControls.js";
import { Kitchen,mixer } from "./components/kitchen.js";
import { Burger, burgerMixer } from "./components/burger.js";
import { Rapper, rapperMixer } from "./components/rapper.js";
import { Gamer, gamerMixer } from "./components/gamer.js";
import { Muppie, muppieMixer } from "./components/muppie.js";
import { Skater } from "./components/skater.js";
import { Chef } from "./components/chef.js";
import { Game } from "./game.js";
import { helperStart, helperEnd, helperSmash, helperLeft, helperRight, helperBurger,helperRapper,helperMuppie,helperGamer,helperSkater,boxBurger,boxRapper,boxMuppie,boxGamer,boxSkater,boxRight,boxLeft,boxSmash } from "./hitboxes.js";
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
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

//Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(4,4,0)
scene.add(directionalLight);

//Camera
const width = 5;
const height = width * (window.innerHeight/window.innerWidth);
const camera = new THREE.OrthographicCamera(width / -2,width / 2,height / 2,height / -2, 1, 100);
camera.position.set(.2,2,4);
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

    if(!boxSmash.intersectsBox(boxBurger) && !boxSmash.intersectsBox(boxRapper) && 
    !boxSmash.intersectsBox(boxMuppie) &&  !boxSmash.intersectsBox(boxGamer) &&
    !boxSmash.intersectsBox(boxSkater)){
        kitchen.isIronEmpty = true;
    }else{
        if(boxSmash.intersectsBox(boxBurger)){
            kitchen.isIronEmpty = false;
        }
        else if(boxSmash.intersectsBox(boxRapper)){
            kitchen.isIronEmpty = false;
        }
        else if(boxSmash.intersectsBox(boxMuppie)){
            kitchen.isIronEmpty = false;
        }
        else if(boxSmash.intersectsBox(boxGamer)){
            kitchen.isIronEmpty = false;
        }
        else if(boxSmash.intersectsBox(boxSkater)){
            kitchen.isIronEmpty = false;
        }
    }

    //console.log('is iron empty? ', kitchen.isIronEmpty)

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
    
    
    if(boxBurger.intersectsBox(boxRight)){
        burger.isActive = true;
    }else if(boxBurger.intersectsBox(boxLeft)){
        burger.isActive = false;
    }
    if(boxRapper.intersectsBox(boxRight)){
        rapper.isActive = true;
    }else if(boxRapper.intersectsBox(boxLeft)){
        rapper.isActive = false;
    }
    if(boxMuppie.intersectsBox(boxRight)){
        muppie.isActive = true;
    }else if(boxMuppie.intersectsBox(boxLeft)){
        muppie.isActive = false;
    }
    if(boxGamer.intersectsBox(boxRight)){
        gamer.isActive = true;
    }else if(boxGamer.intersectsBox(boxLeft)){
        gamer.isActive = false;
    }
    if(boxSkater.intersectsBox(boxRight)){
        skater.isActive = true;
    }else if(boxSkater.intersectsBox(boxLeft)){
        skater.isActive = false;
    }
}

document.querySelector('.smash').addEventListener('click', ()=>{
    kitchen.play()
    if(burger.isActive && boxBurger.intersectsBox(boxSmash)){
        console.log('burger hit!!!');
        game.score+=burger.points;
        burger.smashed=true;
    }else if(burger.isActive && !boxBurger.intersectsBox(boxSmash)){
        console.log('burger no hit!!!');
        game.lifes -=1;
        game.checkLifes();
    }else if(burger.isActive === false){
        console.log('burger not active')
    }

    if(rapper.isActive && boxRapper.intersectsBox(boxSmash)){
        console.log('rapper hit!!!');
        game.score+=rapper.points;
        rapper.smashed=true;
    }else if(rapper.isActive && !boxRapper.intersectsBox(boxSmash)){
        console.log('rapper no hit!!!')
        game.lifes -=1;
        game.checkLifes();
    }else if(rapper.isActive === false){
        console.log('rapper not active')
    }

    if(muppie.isActive && boxMuppie.intersectsBox(boxSmash)){
        console.log('muppie hit!!!');
        game.score+=muppie.points;
        muppie.smashed = true;
    }else if(muppie.isActive && !boxMuppie.intersectsBox(boxSmash)){
        console.log('muppie no hit!!!')
        game.lifes -=1;
        game.checkLifes();
    }else if(muppie.isActive === false){
        console.log('muppie not active')
    }

    if(gamer.isActive && boxGamer.intersectsBox(boxSmash)){
        console.log('gamer hit!!!');
        game.score+=gamer.points;
        gamer.smashed=true;
    }else if(gamer.isActive && !boxGamer.intersectsBox(boxSmash)){
        console.log('gamer no hit!!!')
        game.lifes -=1;
        game.checkLifes();
    }else if(gamer.isActive === false){
        console.log('gamer not active')
    }

    if(skater.isActive && boxSkater.intersectsBox(boxSmash)){
        console.log('skater hit!!!');
        game.score+=skater.points;
        skater.smashed=true;
    }else if(skater.isActive && !boxSkater.intersectsBox(boxSmash)){
        console.log('skater no hit!!!')
        game.lifes -=1;
        game.checkLifes();
    }else if(skater.isActive === false){
        console.log('skater not active')
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
