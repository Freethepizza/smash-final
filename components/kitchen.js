import * as THREE from "../dependencies/three.module.js";
import {GLTFLoader} from "../dependencies/GLTFLoader.js";
import gsap from "../dependencies/gsap/index.js";

const audioListener = new THREE.AudioListener();
const smashSound00 = new THREE.Audio(audioListener);
const smashSound01 = new THREE.Audio(audioListener);
const smashSound02 = new THREE.Audio(audioListener);
const smashSound03 = new THREE.Audio(audioListener);
function randomSfx(){
    var rnd = Math.floor(Math.random()*3);
    switch(rnd){
        case 0:
            smashSound00.play();
            break;
        case 1:
            smashSound01.play();
            break;
        case 2:
            smashSound03.play();
            break;
    }
}

export let mixer = null;
let rightIron = null;
let leftIron = null;

export class Kitchen{
    constructor(manager,scene){
        this.modelUrl = "./models/kitchen.glb";
        this.scene = scene;
        this.manager = manager;
        this.onCreate();
        this.loadSfx();
        this.rightPlayed = false;
        this.isIronEmpty = true;
    }
    onCreate(){
        new GLTFLoader(this.manager).load(
            this.modelUrl,
            gltf=>{
                gltf.scene.name = "kitchen";
                gltf.scene.position.set(0,0,0); 
                gltf.scene.scale.set(3.5,3.5,3.5);
                mixer = new THREE.AnimationMixer(gltf.scene);
                rightIron = mixer.clipAction(gltf.animations[0]);
                leftIron = mixer.clipAction(gltf.animations[1]);
                rightIron.setLoop(THREE.LoopOnce);
                leftIron.setLoop(THREE.LoopOnce);
                this.scene.add(gltf.scene);
            });    
    }
    loadSfx(){
        const sfxLoader = new THREE.AudioLoader(this.manager);
        sfxLoader.load('./sfx/smash0.mp3', (audioBuffer)=>{
            smashSound00.setBuffer(audioBuffer);
        });
        sfxLoader.load('./sfx/smash1.mp3', (audioBuffer)=>{
            smashSound01.setBuffer(audioBuffer);
        });
        sfxLoader.load('./sfx/smash2.mp3', (audioBuffer)=>{
            smashSound02.setBuffer(audioBuffer);
        });
        sfxLoader.load('./sfx/smash3.mp3', (audioBuffer)=>{
            smashSound03.setBuffer(audioBuffer);
        });
    }
    play(){
        if(!this.rightPlayed){
            rightIron.play().reset();
            setTimeout(()=>{
                if(this.isIronEmpty){
                    smashSound02.play()
                }else{
                randomSfx()
            }
            },150);
            this.rightPlayed = true;
        }else{
            leftIron.play().reset();
            setTimeout(()=>{
                if(this.isIronEmpty){
                    smashSound02.play()
                }else{
                randomSfx()
            }
            },150);
            this.rightPlayed = false;
        }
        
    }        
    
}