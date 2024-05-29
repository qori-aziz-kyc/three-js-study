'use client'
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

export default function Home() {
  let canvas: HTMLElement
  useEffect(() => {
    if (canvas) return
    canvas = document.getElementById('canvas')!
    const scene = new THREE.Scene()
    const sizes = {
      width: innerWidth,
      height: innerHeight
    }

    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      5000
    )

    camera.position.set( 3, 2, 8 );
    

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0, 0.5 );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    // ボックスジオメトリー
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
    const boxMaterial = new THREE.MeshLambertMaterial({
      color: '#ffffff'
    })
    const box = new THREE.Mesh(boxGeometry, boxMaterial)
    box.position.z = -10
    box.rotation.set(20, 20, 20)
    scene.add(box)

    const sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
    const sphereMaterial = new THREE.MeshLambertMaterial({
      color: '#23ffff'
    })

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    sphere.position.z = -5
    // sphere.position.y = 1
    // sphere.rotation.set(20, 20, 20)
    scene.add(sphere)

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff, 0)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 4,100,0.5)
    pointLight.position.set(1, 2, 3)
    scene.add(pointLight)

    // アニメーション
    const clock = new THREE.Clock()
    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      box.rotation.x = elapsedTime
      box.rotation.y = elapsedTime
      box.rotation.z = elapsedTime
      // box.position.z =  box.position.z + 0.1
      sphere.rotation.x = elapsedTime
      controls.update();
      window.requestAnimationFrame(tick)
      renderer.render(scene, camera)
    }
    tick()

    // ブラウザのリサイズ処理
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })



  }, [])
  return (
    <>
    <canvas id="canvas"></canvas>
    </>
  );
}
