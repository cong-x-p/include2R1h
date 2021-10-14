import React from 'react';
import * as THREE from 'three';

class Three extends React.Component {

    componentDidMount() {
        this.init()
    }

    init = () => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, this.mount.clientWidth / this.mount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
        this.mount.appendChild(renderer.domElement);
        camera.position.z = 5;

        this.createCube()
        this.animate();

    }

    createCube = () => {
        const geometry = new THREE.BoxGeometry(1, 2, 1, 4);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        this.cube = cube
        this.scene.add(cube);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    componentWillUnmount() {
        this.mount.removeChild(this.renderer.domElement)
    }

    render() {
        return (
            <div
                id="canvas"
                style={{width: '600px', height: '600px', background: '#888'}}
                ref={(mount) => {
                    this.mount = mount
                }}
            />
        );
    }
}

export default Three;
