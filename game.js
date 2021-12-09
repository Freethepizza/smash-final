import * as THREE from "./dependencies/three.module.js";
import gsap from "./dependencies/gsap/index.js"
import { Burger } from "./components/burger.js";

const audioListener = new THREE.AudioListener();
const gameOverSfx = new THREE.Audio(audioListener);


const map = new THREE.TextureLoader().load( './img/smash.png' );
const material = new THREE.SpriteMaterial( { map: map } );
export const sprite = new THREE.Sprite( material );
sprite.position.set(0,2,4);
sprite.scale.set(1.5,1.5)

export class SpriteLoad{
    constructor(manager,url){
        this.manager = manager;
        this.url = url;
        this.material = new THREE.SpriteMaterial( { map: this.onCreate() } );
        this.sprite = new THREE.Sprite(this.material);
        this.sprite.visible = false;
    }
    onCreate(){
       return new THREE.TextureLoader(this.manager).load(this.url);
    }
    animate(){
        const timeline = gsap.timeline({ease:'linear'})
        timeline.add(()=>{this.sprite.visible = true},"+=.2")
        timeline.add(()=>{this.sprite.visible = false},"+=.2")
    }
}

export class Game{
    constructor(burger,rapper,gamer,muppie,skater,manager){
        this.burger = burger;
        this.rapper = rapper;
        this.gamer = gamer;
        this.muppie = muppie;
        this.skater = skater;
        this.manager = manager;
        this.onCreate();
        this.lifes = 3; 
        this.score = 0;
        this.over = false;
    }
    onCreate(){
        const sfxLoader = new THREE.AudioLoader(this.manager);
        sfxLoader.load('./sfx/gameover.mp3', (audioBuffer)=>{
            gameOverSfx.setBuffer(audioBuffer);
        });
    }
    checkLifes(){
        this.lifes === 0 ? this.over = true : this.over = false;
    }
    level1(){
        const timeline = gsap.timeline({ease:'linear'});
        timeline.add(()=>this.burger.animate())
        timeline.add(()=>this.rapper.animate3(),"+=2");
        timeline.add(()=>this.burger.animate(), "+=2")
        timeline.add(()=>this.rapper.animate(),"+=2");
        timeline.add(()=>this.burger.animate(),"+=2");
        timeline.add(()=>this.rapper.animate2(),"+=2");
        timeline.add(()=>this.level2(), "+=2")
        
    }
    level2(){
        const timeline = gsap.timeline({ease:'linear'});
        timeline.add(()=>this.burger.animate());
        timeline.add(()=>this.muppie.animate(),"+=2");
        timeline.add(()=>this.rapper.animate3(),"+=2");
        timeline.add(()=>this.muppie.animate(),"+=2");
        timeline.add(()=>this.rapper.animate2(),"+=2");
        timeline.add(()=>this.gamer.animate(),"+=2.5");
        timeline.add(()=>this.level3(),"+=2")
    }
    level3(){
        const timeline = gsap.timeline({ease:'linear'});
        timeline.add(()=>this.muppie.animate());
        timeline.add(()=>this.gamer.animate(),"+=2.5");
        timeline.add(()=>this.rapper.animate3(),"+=2");
        timeline.add(()=>this.burger.animate(),"+=2");
        timeline.add(()=>this.gamer.animate(),"+=2.5");
        timeline.add(()=>this.skater.animate(),"+=2.5");
        //timeline.add(()=>this.level4())
    }
    level4(){
        const timeline = gsap.timeline({ease:'linear'});
        timeline.add(()=>this.skater.animate(),"+=2");
        timeline.add(()=>this.rapper.animate(),"+=1.8");
        timeline.add(()=>this.gamer.animate(),"+=1.8");
        timeline.add(()=>this.rapper.animate2(),"+=1.8");
        timeline.add(()=>timeline.kill())
    }
    allRandom(){

    }
    showLifes(){
        console.log(this.lifes)
    }
    gameOverSfx(){
        gameOverSfx.play();
    }
}