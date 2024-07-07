<script>
    // import statements
    import { onMount} from 'svelte';
    import * as THREE from 'three';
    import vertexShader from './shaders/vertex.glsl';
    import fragmentShader from './shaders/fragment.glsl';
    import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
    import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
    import globeIMG from '../images/earth_test.jpg';

    // add coordinates of vacations to add points to the globe (city : [latitude, longitude])
    // if in south hemisphere add minus to latitude
    // if in eastern hemisphere add minus to longitude
    const coordinates = {
        "Toronto->Vancouver" : [ [43.6548, 79.3883], [49.2827, 123.1207] ],
        "Toronto->NewYork" : [ [43.6548, 79.3883], [40.7831, 73.9712] ],
        "Toronto->SanFransisco" : [ [43.6548, 79.3883], [37.7749, 122.4194] ],
    }

    // variables 
    let canvas;
    let isDragging = false;
    let isSpinning = false;
    const mouse = { x: undefined, y: undefined };
    const previousMouse = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };

    // ---------- destination pins ----------
    function convertToCartesian(point) {
        const R = 10; // radius of the globe
        return point.map(coord => {
            const lat = coord[0] * Math.PI / 180;
            const lng = coord[1] * Math.PI / 180;
            const x = R * Math.cos(lat) * Math.cos(lng);
            const y = R * Math.sin(lat);
            const z = R * Math.cos(lat) * Math.sin(lng);
            return [x, y, z];
        });
    }
    // --------------------------------------

    // ---------- Mouse movement events ----------
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
    // -------------------------------------------

    // ---------- Phone movement events ----------
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
    // -------------------------------------------

    onMount(() => {
        // create a scene and camera for globe
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

        // create a sphere which will be a globe
        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(10, 50, 50),
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

        // add 'atmosphere' to the globe
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(10, 50, 50),
            new THREE.ShaderMaterial({
                vertexShader: atmosphereVertexShader,
                fragmentShader: atmosphereFragmentShader,
                blending: THREE.AdditiveBlending,
                side: THREE.BackSide
            })
        );
        atmosphere.scale.set(1.1, 1.1, 1.1);

        const object = new THREE.Object3D();
        object.add(sphere);
        object.add(atmosphere);

        Object.values(coordinates).forEach(route => {
            let cartesian = convertToCartesian(route);
            let mesh1 = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 20, 20),
                new THREE.MeshBasicMaterial({color: 0x0000ff})
            );
            let mesh2 = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 20, 20),
                new THREE.MeshBasicMaterial({color: 0x00ff00})
            );
            console.log(cartesian)
            mesh1.position.set(cartesian[0][0], cartesian[0][1], cartesian[0][2])
            mesh2.position.set(cartesian[1][0], cartesian[1][1], cartesian[1][2])
            object.add(mesh1);
            object.add(mesh2);
        });

        scene.add(object);

        camera.position.z = 30;

        // animate the scene
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            // object.rotation.y += 0.002;
            if (isDragging) {
                const deltaX = mouse.x - previousMouse.x;
                const deltaY = mouse.y - previousMouse.y;
                previousMouse.x = mouse.x;
                previousMouse.y = mouse.y;
                object.rotation.x -= deltaY * 0.5;
                object.rotation.y += deltaX * 0.5;
            } else if (isSpinning) {
                object.rotation.x -= velocity.y * 0.8;
                object.rotation.y += velocity.x * 0.8;
                velocity.x *= 0.95;
                velocity.y *= 0.95;
                if (Math.abs(velocity.x) < 0.001 && Math.abs(velocity.y) < 0.001) {
                    isSpinning = false;
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