<script>
    // import statements
    import { onMount} from 'svelte';
    import * as THREE from 'three';
    import vertexShader from './shaders/vertex.glsl';
    import fragmentShader from './shaders/fragment.glsl';
    import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
    import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';
    import globeIMG from '../images/main/earth_test.jpg';

    // add coordinates of vacations to add points to the globe (city : [latitude, longitude])
    // if in south hemisphere add minus to latitude
    // if in eastern hemisphere add minus to longitude
    const coordinates = {
        "Toronto->Vancouver" : [ [43.6771, 79.6334], [49.1934, 123.1751] ],
        "Toronto->NewYork" : [ [43.6771, 79.6334], [40.6446, 73.7797] ],
        "Toronto->SanFransisco" : [ [43.6771, 79.6334], [37.6193, 122.3816] ],
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
    function getCurve(p1, p2) {
        let v1 = new THREE.Vector3(p1[0], p1[1], p1[2]);
        let v2 = new THREE.Vector3(p2[0], p2[1], p2[2]);
        let points = [];
        for (let i = 0; i <= 20; ++i) {
            let p = new THREE.Vector3().lerpVectors(v1, v2, i/20);
            p.normalize();
            p.multiplyScalar(10 + 0.4*Math.sin(Math.PI*i/20));
            points.push(p);
        }
        return points;
    }
    function createPin(color) {
        //create group for sphere and cylinder
        const pinGroup = new THREE.Group();
        // create top of pin
        const ballGeometry = new THREE.SphereGeometry(0.15, 20, 20);
        const ballMaterial = new THREE.MeshBasicMaterial({color: color});
        const ball = new THREE.Mesh(ballGeometry, ballMaterial);
        // create pointy part of pin
        const cylinderGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 20);
        const cylinderMaterial = new THREE.MeshBasicMaterial({color: 0xD0D3D4});
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        // move sphere ontop of cylinder
        ball.position.set(0, 0, -0.35);
        cylinder.rotation.x = Math.PI / 2;
        pinGroup.add(ball);
        pinGroup.add(cylinder);
        return pinGroup;
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
            event.preventDefault();
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
            event.preventDefault();
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
        let is_mobile = window.innerWidth <= 767;
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
            // get x,y,z for creating a pin on the globe
            let cartesian = convertToCartesian(route);
            // create pins
            let startPin = createPin(0x000000);
            let destPin = createPin(0xE74C3C);
            // position the pins relative to the globe
            startPin.position.set(cartesian[0][0], cartesian[0][1], cartesian[0][2]);
            destPin.position.set(cartesian[1][0], cartesian[1][1], cartesian[1][2]);
            startPin.lookAt(scene.position);
            destPin.lookAt(scene.position);
            // create path between startPin and destPin
            let points = getCurve(cartesian[0], cartesian[1]);
            let path = new THREE.CatmullRomCurve3(points);
            const geometry = new THREE.TubeGeometry(path, 20, 0.015, 8, false);
            const material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
            const mesh = new THREE.Mesh(geometry, material);
            // add to globe
            object.add(startPin);
            object.add(destPin);
            object.add(mesh);
        });

        scene.add(object);
        camera.position.z = is_mobile ? 20 : 20;

        // animate the scene
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            object.rotation.y += 0.001;
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
    @media (max-width: 767px) {
        canvas {
            height: 400px;
        }
    }
</style>