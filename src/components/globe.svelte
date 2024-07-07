<script>
    import { onMount, onDestroy } from 'svelte';
    import gsap from 'gsap';
    import * as THREE from 'three';
    import vertexShader from './shaders/vertex.glsl';
    import fragmentShader from './shaders/fragment.glsl';
    import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
    import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
    import globeIMG from '../images/earth.jpg';

    let canvas;
    const mouse = { x: undefined, y: undefined };
    const previousMouse = { x: 0, y: 0 };
    let isDragging = false;

    function onMouseMove(event) {
        if (isDragging) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        }
    }
    function onMouseDown() {
        isDragging = true;
        previousMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        previousMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.x = previousMouse.x;
        mouse.y = previousMouse.y;
    }
    function onMouseUp() {
        isDragging = false;
    }

    function onTouchStart(event) {
        if (event.touches.length === 1) {
            isDragging = true;
            previousMouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            previousMouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
            mouse.x = previousMouse.x;
            mouse.y = previousMouse.y;
        }
    }
    function onTouchMove(event) {
        if (isDragging && event.touches.length === 1) {
            mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    }
    function onTouchEnd() {
        isDragging = false;
    }

    onMount(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer(
            {
                canvas: canvas,
                antialias: true,
                alpha: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(canvas.devicePixelRatio);
        renderer.setClearColor( 0x000000, 0);

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: {
                    globeTexture: {
                        value: new THREE.TextureLoader().load(globeIMG)
                    }
                }
            })
        );

        scene.add(sphere);

        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(5, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            })
        );

        atmosphere.scale.set(1.1, 1.1, 1.1);

        scene.add(atmosphere);

        const group = new THREE.Group();
        group.add(sphere);
        scene.add(group);

        camera.position.z = 15
        
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            sphere.rotation.y += 0.0015;
            if (isDragging) {
                const deltaX = mouse.x - previousMouse.x;
                const deltaY = mouse.y - previousMouse.y;
                previousMouse.x = mouse.x;
                previousMouse.y = mouse.y;
                group.rotation.x -= deltaY * 1
                group.rotation.y += deltaX * 1
            }
        }

        animate();
    });
</script> 

<canvas bind:this={canvas}
    on:mousemove={onMouseMove} on:mousedown={onMouseDown} on:mouseup={onMouseUp} on:mouseleave={onMouseUp}
    on:touchstart={onTouchStart} on:touchmove={onTouchMove} on:touchend={onTouchEnd}></canvas>

<style>
    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>