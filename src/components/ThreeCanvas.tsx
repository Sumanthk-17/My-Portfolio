import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  interactive?: boolean;
}

export function ThreeCanvas({ interactive = true }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0618, 0.012);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central 3D Icosahedron Hologram (Faceted Gem Core)
    const icoGeo = new THREE.IcosahedronGeometry(4.5, 1);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.85,
      transmission: 0.6,
      thickness: 1.5,
      wireframe: false,
      transparent: true,
      opacity: 0.45,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    mainGroup.add(icoMesh);

    // 1b. Glowing Wireframe Shell for the Icosahedron
    const icoWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const icoWireMesh = new THREE.Mesh(icoGeo, icoWireMat);
    icoWireMesh.scale.setScalar(1.03);
    mainGroup.add(icoWireMesh);

    // 2. Inner Pulsing Core
    const coreGeo = new THREE.OctahedronGeometry(2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 3. Floating Torus Orbit Rings
    const ring1Geo = new THREE.TorusGeometry(8.5, 0.06, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.65,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(10.5, 0.04, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.55,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // 4. 3D Depth Particles (Interactive Cyber Starfield)
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x38bdf8), // Cyan
      new THREE.Color(0x818cf8), // Indigo
      new THREE.Color(0xc084fc), // Purple
      new THREE.Color(0xec4899), // Pink
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 12 + Math.random() * 48;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[idx] = radius * Math.sin(phi) * Math.cos(theta);
      positions[idx + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[idx + 2] = radius * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. 3D Ambient and Point Lights
    const ambientLight = new THREE.AmbientLight(0x18182e, 2.5);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00f0ff, 4, 50);
    cyanPointLight.position.set(12, 10, 10);
    scene.add(cyanPointLight);

    const purplePointLight = new THREE.PointLight(0xd946ef, 3.5, 50);
    purplePointLight.position.set(-12, -10, 10);
    scene.add(purplePointLight);

    // Dynamic mouse parallax tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const normX = (event.clientX / window.innerWidth) * 2 - 1;
      const normY = -(event.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = normX * 0.8;
      mouse.targetY = normY * 0.8;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Scroll parallax tracking
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Window resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate central 3D hologram
      icoMesh.rotation.x = elapsedTime * 0.15 + mouse.y * 0.3;
      icoMesh.rotation.y = elapsedTime * 0.2 + mouse.x * 0.3;

      icoWireMesh.rotation.x = icoMesh.rotation.x;
      icoWireMesh.rotation.y = icoMesh.rotation.y;

      coreMesh.rotation.x = -elapsedTime * 0.35 - mouse.y * 0.4;
      coreMesh.rotation.y = -elapsedTime * 0.25 - mouse.x * 0.4;
      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.12;
      coreMesh.scale.set(pulse, pulse, pulse);

      // Rings orbit
      ring1.rotation.z = elapsedTime * 0.18;
      ring1.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.15;
      ring2.rotation.z = -elapsedTime * 0.12;
      ring2.rotation.y = Math.PI / 6 + Math.cos(elapsedTime * 0.4) * 0.15;

      // Particles slow drift + interaction
      particles.rotation.y = elapsedTime * 0.03 + mouse.x * 0.1;
      particles.rotation.x = mouse.y * 0.1;

      // Group position reacts to scroll and mouse
      const scrollOffset = scrollY * 0.008;
      mainGroup.position.y = mouse.y * 1.5 - scrollOffset * 0.5;
      mainGroup.position.x = mouse.x * 2.0;
      mainGroup.rotation.y = mouse.x * 0.4;
      mainGroup.rotation.x = -mouse.y * 0.3;

      // Adjust camera with scroll depth
      camera.position.z = 24 + Math.sin(elapsedTime * 0.5) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      icoWireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
