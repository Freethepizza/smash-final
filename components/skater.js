import * as THREE from "../dependencies/three.module.js";
import {GLTFLoader} from "../dependencies/GLTFLoader.js";
import gsap from "../dependencies/gsap/index.js";

export let skaterMixer = null;
let walk = null;

export class Skater extends THREE.Group{
    constructor(manager){
        super();
        this.modelUrl = "./models/skater.glb";
        this.manager = manager;
        this.isActive = false;
        this.onCreate();
        this.smashed = false;
        this.points = 100;
        this.inIron = false;
    }
    onCreate(){
        new GLTFLoader(this.manager).load(
            this.modelUrl,
            gltf=>{
                this.updateTransform();
                this.add(gltf.scene);
                skaterMixer = new THREE.AnimationMixer(gltf.scene);
                walk = skaterMixer.clipAction(gltf.animations[0]);
                walk.play()
            });
    }
    updateTransform(){
        this.name = "skater";
        this.position.set(1.4,0,-.8); 
        this.scale.set(.7,.7,.7);
    }
    animate(){
        const timeline = gsap.timeline({ease:'linear'});
        timeline.to(this.position,{y:1.25,duration:.3,ease:'linear'})
        timeline.to(this.position,{z:2.6,duration:.8,ease:'linear'})
        timeline.to(this.rotation,{y:-1.5,duration:.05,ease:'linear'})
        timeline.to(this.position,{x:-1.4,duration:.5,ease:'linear'})
        timeline.to(this.rotation,{y:-3.15,duration:.1,ease:'linear'})
        timeline.to(this.position,{z:-.8,duration:.3,ease:'linear'})
        timeline.to(this.position,{y:0,duration:.3,ease:'linear'})
        timeline.to(this.position,{x:1.3,duration:0,ease:'linear'})
        timeline.to(this.rotation,{y:0,duration:0,ease:'linear'})
        timeline.add(()=>this.smashed=false)
    }
}