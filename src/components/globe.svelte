<script>
    import { onMount} from 'svelte';
    import * as THREE from 'three';
    import vertexShader from './shaders/vertex.glsl';
    import fragmentShader from './shaders/fragment.glsl';
    import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
    import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
    import globeIMG from '../images/earth.jpg';

    let canvas;
    const mouse = { x: undefined, y: undefined };
    const previousMouse = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    let isDragging = false;
    let isSpinning = false;

    function onMouseMove(event) {
        if (isDragging) {
            const newMouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const newMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            velocity.x = newMouseX - previousMouse.x;
            velocity.y = newMouseY - previousMouse.y;
            mouse.x = newMouseX;
            mouse.y = newMouseY;
        }
    }

    function onMouseDown(event) {
        isDragging = true;
        isSpinning = false;
        previousMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        previousMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.x = previousMouse.x;
        mouse.y = previousMouse.y;
    }

    function onMouseUp() {
        isDragging = false;
        isSpinning = true;
    }

    function onTouchStart(event) {
        if (event.touches.length === 1) {
            isDragging = true;
            isSpinning = false;
            previousMouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            previousMouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
            mouse.x = previousMouse.x;
            mouse.y = previousMouse.y;
        }
    }

    function onTouchMove(event) {
        if (isDragging && event.touches.length === 1) {
            const newMouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
            const newMouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
            velocity.x = newMouseX - previousMouse.x;
            velocity.y = newMouseY - previousMouse.y;
            mouse.x = newMouseX;
            mouse.y = newMouseY;
        }
    }

    function onTouchEnd() {
        isDragging = false;
        isSpinning = true;
    }

    onMount(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(10, 50, 50), // Increased radius from 5 to 10
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
            new THREE.SphereGeometry(10, 50, 50), // Adjusted to match the sphere geometry radius
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

        camera.position.z = 30; // Adjusted camera position to fit the larger globe

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            sphere.rotation.y += 0.002;
            if (isDragging) {
                const deltaX = mouse.x - previousMouse.x;
                const deltaY = mouse.y - previousMouse.y;
                previousMouse.x = mouse.x;
                previousMouse.y = mouse.y;
                group.rotation.x -= deltaY * 0.5;
                group.rotation.y += deltaX * 0.5;
            } else if (isSpinning) {
                group.rotation.x -= velocity.y * 0.8;
                group.rotation.y += velocity.x * 0.8;
                velocity.x *= 0.95; // Reduce the velocity over time
                velocity.y *= 0.95; // Reduce the velocity over time
                if (Math.abs(velocity.x) < 0.001 && Math.abs(velocity.y) < 0.001) {
                    isSpinning = false; // Stop spinning when velocity is very low
                }
            }
        }

        animate();
    });
</script>

<canvas 
    bind:this={canvas} 
    on:mousemove={onMouseMove} on:mousedown={onMouseDown} on:mouseup={onMouseUp} on:mouseleave={onMouseUp}
    on:touchstart={onTouchStart} on:touchmove={onTouchMove} on:touchend={onTouchEnd}>
</canvas>

<style>
    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
</style>