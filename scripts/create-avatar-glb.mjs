import { writeFile } from 'node:fs/promises';
import {
  CapsuleGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  CylinderGeometry
} from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buffer) => {
      this.result = buffer;
      this.onloadend?.();
    }, (error) => {
      this.error = error;
      this.onerror?.(error);
    });
  }
};

const avatar = new Group();
avatar.name = 'Samuel_Human_WebGLB_Avatar';

const skin = new MeshStandardMaterial({ color: new Color('#f8fafc'), roughness: 0.48 });
const shirt = new MeshStandardMaterial({ color: new Color('#111827'), roughness: 0.55 });
shirt.name = 'clothes_Mat';
skin.name = 'body_Mat';
const dark = new MeshStandardMaterial({ color: new Color('#05070c'), roughness: 0.6 });

const torso = new Mesh(new CapsuleGeometry(0.42, 0.92, 16, 32), shirt);
torso.name = 'Torso';
torso.position.y = 0.42;
avatar.add(torso);

const head = new Mesh(new SphereGeometry(0.32, 40, 40), skin);
head.name = 'Head';
head.position.y = 1.34;
avatar.add(head);

const hair = new Mesh(new SphereGeometry(0.34, 32, 16), dark);
hair.name = 'Hair';
hair.position.set(0, 1.47, -0.02);
hair.scale.set(1, 0.62, 0.92);
avatar.add(hair);

for (const side of [-1, 1]) {
  const arm = new Mesh(new CapsuleGeometry(0.075, 0.86, 12, 20), shirt);
  arm.name = side < 0 ? 'LeftArm' : 'RightArm';
  arm.position.set(side * 0.52, 0.46, 0);
  arm.rotation.z = side * 0.12;
  avatar.add(arm);

  const hand = new Mesh(new SphereGeometry(0.085, 16, 16), skin);
  hand.name = side < 0 ? 'LeftHand' : 'RightHand';
  hand.position.set(side * 0.58, -0.05, 0);
  avatar.add(hand);

  const leg = new Mesh(new CapsuleGeometry(0.115, 0.9, 12, 20), dark);
  leg.name = side < 0 ? 'LeftLeg' : 'RightLeg';
  leg.position.set(side * 0.16, -0.58, 0);
  avatar.add(leg);

  const shoe = new Mesh(new CylinderGeometry(0.13, 0.15, 0.09, 18), dark);
  shoe.name = side < 0 ? 'LeftShoe' : 'RightShoe';
  shoe.position.set(side * 0.16, -1.07, 0.04);
  shoe.scale.z = 1.45;
  avatar.add(shoe);
}

const exporter = new GLTFExporter();

const arrayBuffer = await new Promise((resolve, reject) => {
  exporter.parse(
    avatar,
    (result) => resolve(result),
    (error) => reject(error),
    { binary: true }
  );
});

await writeFile('public/avatar/samuel.glb', Buffer.from(arrayBuffer));
