import React from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import styles from "../styles/threejs.module.css";

let renderer, camera, scene, light, controls;
// const Dom = document.querySelector('#container');
// const width = Dom.clientWidth, height = Dom.clientHeight;
const globeTextureLoader = new THREE.TextureLoader();
const group = new THREE.Group();

class Three extends React.Component {
    componentDidMount() {
        this.init()
    }

    init = () => {
        window.onload = () => {
            this.initRenderer();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initControls();
            this.initPoints();
            this.initEarth();
            this.initEarthAperture();
            this.animate();
            window.addEventListener('resize', this.onWindowResize, false);
        };
    }

    //初始化渲染
    initRenderer = () => {
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        this.mount.appendChild(renderer.domElement);
    }

    // 初始化相机
    initCamera = () => {
        camera = new THREE.PerspectiveCamera(45, this.mount.clientWidth / this.mount.clientHeight, 1, 10000);
        camera.position.set(5, -20, 200);
        camera.lookAt(0, 3, 0);
        window.camera = camera;
    }

    // 初始化场景
    initScene = () => {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x020924);
        scene.fog = new THREE.Fog(0x020924, 200, 1000);
        window.scene = scene;
    }

    // 初始化UI
    initControls = () => {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = true;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 2;
        controls.enablePan = true;
    }

    // 初始化光
    initLight = () => {
        const ambientLight = new THREE.AmbientLight(0xcccccc, 1.1);
        scene.add(ambientLight);
        let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
        directionalLight.position.set(1, 0.1, 0).normalize();
        const directionalLight2 = new THREE.DirectionalLight(0xff2ffff, 0.2);
        directionalLight2.position.set(1, 0.1, 0.1).normalize();
        scene.add(directionalLight);
        scene.add(directionalLight2);
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.2);
        hemiLight.position.set(0, 1, 0);
        scene.add(hemiLight);
        directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 500, -20);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.top = 18;
        directionalLight.shadow.camera.bottom = -10;
        directionalLight.shadow.camera.left = -52;
        directionalLight.shadow.camera.right = 12;
        scene.add(directionalLight);
    }

    // 窗口
    onWindowResize = () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        this.renders();
    }

    // 渲染
    renders = () => {
        renderer.clear();
        renderer.render(scene, camera);
    }

    // 动画
    animate = () => {
        window.requestAnimationFrame(() => {
            if (controls) controls.update();
            this.renders();
            this.animate();
        });
    }

    // 初始化星星
    initPoints = () => {
        const positions = [];
        const colors = [];
        const geometry = new THREE.BufferGeometry();
        for (let i = 0; i < 10000; i++) {
            const vertex = new THREE.Vector3();
            vertex.x = Math.random() * 2 - 1;
            vertex.y = Math.random() * 2 - 1;
            vertex.z = Math.random() * 2 - 1;
            positions.push(vertex.x, vertex.y, vertex.z);
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
            colors.push(color.r, color.g, color.b);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));


        const texture = new THREE.TextureLoader().load("/gradient.png");
        const starsMaterial = new THREE.PointsMaterial({
            map: texture,
            size: 1,
            transparent: true,
            opacity: 1,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        let stars = new THREE.Points(geometry, starsMaterial);
        stars.scale.set(300, 300, 300);
        scene.add(stars);
    }

    //初始化地球
    initEarth = () => {
        globeTextureLoader.load("/earth.jpg", function (texture) {
            const globeGeometry = new THREE.SphereGeometry(5, 100, 100);
            const globeMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.DoubleSide
            });
            const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
            group.rotation.set(0.5, 2.9, 0.1);
            group.add(globeMesh);
            scene.add(group);
        });
    }

    //初始化光晕效果
    initEarthAperture = () => {
        const texture = globeTextureLoader.load("/earth_aperture.png");
        const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            opacity: 0.5,
            depthWrite: false
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(5 * 3, 5 * 3, 1);
        group.add(sprite)
    }

    componentWillUnmount() {
        this.mount.removeChild(renderer.domElement)
    }

    render() {
        return (
            <div
                className={styles.canvas}
                ref={(mount) => {
                    this.mount = mount
                }}
            />
        );
    }
}

export default Three;
