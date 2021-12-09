import * as THREE from "../dependencies/three.module.js";
import {GLTFLoader} from "../dependencies/GLTFLoader.js";
import gsap from "../dependencies/gsap/index.js";

export class Chef extends THREE.Group{
    constructor(manager){
        super();
        this.modelUrl = "./models/chef.glb";
        this.manager = manager;
        this.onCreate();
    }
    onCreate(){
        new GLTFLoader(this.manager).load(
            this.modelUrl,
            gltf=>{
                this.updateTransform();
                this.add(gltf.scene);
            });
    }
    updateTransform(){
        this.name = "chef";
        this.position.set(-.5,0,1.5); 
        this.scale.set(1,1,1);
    }
}