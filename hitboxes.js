import * as THREE from "./dependencies/three.module.js";

export const boxStart = new THREE.Box3();
boxStart.setFromCenterAndSize( new THREE.Vector3( 1.32, 1.8, -.5 ), new THREE.Vector3( .8, 1, 1 ) );

export const helperStart = new THREE.Box3Helper( boxStart, 0xffff00 );

export const boxEnd = new THREE.Box3();
boxEnd.setFromCenterAndSize( new THREE.Vector3( -1.41, 1.8, -.5 ), new THREE.Vector3( .8, 1, 1 ) );

export const helperEnd = new THREE.Box3Helper( boxEnd, 0xffff00 );

export const boxSmash = new THREE.Box3();
boxSmash.setFromCenterAndSize( new THREE.Vector3( 0, 1.5, 2.7 ), new THREE.Vector3( 1, .4, .7 ) );

export const helperSmash = new THREE.Box3Helper( boxSmash, 0xffff00 );

export const boxLeft = new THREE.Box3();
boxLeft.setFromCenterAndSize( new THREE.Vector3( -1.3, 1.5, 2.6 ), new THREE.Vector3( 1, .4, .8 ) );

export const helperLeft = new THREE.Box3Helper( boxLeft, 0xffff00 );

export const boxRight = new THREE.Box3();
boxRight.setFromCenterAndSize( new THREE.Vector3( 1.2, 1.5, 2.6 ), new THREE.Vector3( 1, .4, .8 ) );

export const helperRight = new THREE.Box3Helper( boxRight, 0xffff00 );

export const boxBurger = new THREE.Box3();
boxBurger.setFromCenterAndSize( new THREE.Vector3( 1.2, 1.5, 1.6 ), new THREE.Vector3( 1, .4, 3 ) );

export const helperBurger = new THREE.Box3Helper( boxBurger, 0xffff00 );

export const boxRapper = new THREE.Box3();
boxRapper.setFromCenterAndSize( new THREE.Vector3( 1.2, 1.5, 1.6 ), new THREE.Vector3( 1, .4, 3 ) );

export const helperRapper = new THREE.Box3Helper( boxRapper, 0xffff00 );

export const boxMuppie = new THREE.Box3();
boxMuppie.setFromCenterAndSize( new THREE.Vector3( 1.2, 1.5, 1.6 ), new THREE.Vector3( 1, .4, 3 ) );

export const helperMuppie = new THREE.Box3Helper( boxMuppie, 0xffff00 );

export const boxGamer = new THREE.Box3();
boxGamer.setFromCenterAndSize( new THREE.Vector3( 1.2, 1.5, 1.6 ), new THREE.Vector3( 1, .4, 3 ) );

export const helperGamer = new THREE.Box3Helper( boxGamer, 0xffff00 );


export const boxSkater = new THREE.Box3();
boxGamer.setFromCenterAndSize( new THREE.Vector3( 1.2, 1.5, 1.6 ), new THREE.Vector3( 1, .4, 3 ) );

export const helperSkater = new THREE.Box3Helper( boxSkater, 0xffff00 );