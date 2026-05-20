import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CameraModel({ refs }) {
  useFrame((state) => {
    if (refs.root.current) {
      refs.root.current.rotation.y +=
        Math.sin(state.clock.elapsedTime * 0.35) * 0.002;
      refs.root.current.rotation.x +=
        Math.cos(state.clock.elapsedTime * 0.2) * 0.0008;
    }
  });

  return (
    <group ref={refs.root} rotation={[0, 0, 0]}>
      <mesh ref={refs.bracket} position={[0, -0.6, -0.15]} castShadow>
        <boxGeometry args={[0.5, 0.12, 0.2]} />
        <meshStandardMaterial
          color="#0b1220"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.95, 0.95, 0.5, 32]} />
        <meshStandardMaterial color="#071126" metalness={0.9} roughness={0.2} />
      </mesh>

      <mesh position={[0, 0.05, 0.05]} ref={refs.lens} castShadow>
        <sphereGeometry args={[0.46, 32, 32]} />
        <meshPhysicalMaterial
          color="#071126"
          metalness={0.2}
          roughness={0.05}
          transmission={0.6}
          clearcoat={0.8}
          clearcoatRoughness={0.02}
        />
      </mesh>

      <mesh position={[0, 0.07, 0.42]} ref={refs.ir}>
        <circleGeometry args={[0.24, 64]} />
        <meshStandardMaterial
          emissive="#05283a"
          color="#00121a"
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      <mesh position={[-0.45, -0.02, 0.22]} ref={refs.mic}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#0f1724" metalness={0.6} roughness={0.2} />
      </mesh>

      <mesh
        ref={refs.fov}
        position={[0, -0.05, 0.25]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <coneGeometry args={[1.6, 2.6, 32, 1, true]} />
        <meshStandardMaterial
          transparent
          opacity={0.06}
          color="#60a5fa"
          side={2}
        />
      </mesh>

      <mesh ref={refs.overlay} position={[0, 0.15, 1.2]}>
        <planeGeometry args={[1.6, 0.9]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

export default function Showcase3D() {
  const containerRef = useRef();
  const rootRef = useRef();
  const lensRef = useRef();
  const fovRef = useRef();
  const irRef = useRef();
  const micRef = useRef();
  const bracketRef = useRef();
  const overlayRef = useRef();
  const unknownRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 720);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(rootRef.current.rotation, {
      y: -0.4,
      x: 0.08,
      duration: 1.0,
      ease: "power2.out",
    });
    tl.to(rootRef.current.position, { z: 0, duration: 0.8 }, 0);

    tl.to(
      rootRef.current.position,
      { z: -0.6, duration: 1.2, ease: "power2.inOut" },
      ">+0.1",
    );
    tl.to(
      lensRef.current.scale,
      { x: 1.18, y: 1.18, z: 1.18, duration: 0.9, ease: "power2.out" },
      "<",
    );
    tl.to(
      lensRef.current.material,
      { emissiveIntensity: 1.4, duration: 0.6 },
      "<",
    );

    tl.to(
      fovRef.current.scale,
      { x: 1.2, y: 1.2, z: 1.2, duration: 0.9, ease: "power2.out" },
      ">+=0.2",
    );
    tl.to(fovRef.current.material, { opacity: 0.14, duration: 0.6 }, "<");

    tl.to(
      overlayRef.current.material,
      { opacity: 0.001, duration: 0.01 },
      ">+=0.1",
    );

    tl.to(
      rootRef.current.rotation,
      { y: -0.1, x: 0.02, duration: 1.0, ease: "power2.out" },
      ">+=0.3",
    );
    tl.to(rootRef.current.position, { z: -0.2, duration: 1.0 }, "<");

    tl.to(
      rootRef.current.position,
      { z: 0.6, duration: 1.2, ease: "power2.inOut" },
      ">+=0.2",
    );
    tl.to(
      rootRef.current.rotation,
      { y: 0, x: 0, duration: 1.2, ease: "power2.inOut" },
      "<",
    );

    if (!containerRef.current) return;
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${containerRef.current.clientHeight}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        tl.progress(self.progress);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((s) => s.kill());
      tl.kill();
    };
  }, []);

  const sparkles = isMobile ? null : <Sparkles count={30} size={6} />;

  return (
    <section ref={containerRef} className="relative w-full">
      <div className="h-screen w-full bg-gradient-to-b from-black via-slate-900 to-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 h-screen">
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-full max-w-3xl">
                <div className="sticky top-20 flex h-[70vh] items-center justify-center">
                  <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-slate-900/50 to-black/20 p-4 shadow-2xl">
                    <Canvas
                      shadows
                      dpr={[1, 1.5]}
                      camera={{ position: [0, 0, 3.2], fov: 36 }}
                      className="rounded-2xl"
                    >
                      <ambientLight intensity={0.7} />
                      <directionalLight
                        position={[5, 5, 5]}
                        intensity={1.2}
                        castShadow
                      />
                      <directionalLight
                        position={[-5, -4, -3]}
                        intensity={0.4}
                      />
                      <Suspense fallback={null}>
                        <CameraModel
                          refs={{
                            root: rootRef,
                            lens: lensRef,
                            fov: fovRef,
                            ir: irRef,
                            mic: micRef,
                            bracket: bracketRef,
                            overlay: overlayRef,
                            unknown: unknownRef,
                          }}
                        />
                      </Suspense>
                      <ContactShadows
                        position={[0, -1.05, 0]}
                        opacity={0.6}
                        scale={4}
                        blur={2.5}
                        far={1.6}
                      />
                      <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        enableRotate={false}
                      />
                    </Canvas>
                    <div className="pointer-events-none absolute inset-0">
                      {sparkles}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-1 flex flex-col justify-center">
              <div className="space-y-8">
                <div
                  className="showcase-step h-screen flex items-center"
                  id="step-intro"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-3xl font-semibold text-white">
                      Smart AI Camera System for Automated Attendance
                    </h2>
                    <p className="mt-4 text-slate-300 max-w-md">
                      A compact, intelligent camera built to capture and
                      reconcile student attendance automatically with
                      enterprise-grade reliability.
                    </p>
                  </motion.div>
                </div>

                <div
                  className="showcase-step h-screen flex items-center"
                  id="step-lens"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      Lens — High-resolution capture
                    </h3>
                    <p className="mt-3 text-slate-300 max-w-md">
                      4MP high-resolution lens captures student faces from 3–5
                      meters with high clarity.
                    </p>
                  </motion.div>
                </div>

                <div
                  className="showcase-step h-screen flex items-center"
                  id="step-fov"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      Wide-angle field-of-view
                    </h3>
                    <p className="mt-3 text-slate-300 max-w-md">
                      90°–120° viewing angle enables group detection for
                      multiple students simultaneously.
                    </p>
                  </motion.div>
                </div>

                <div
                  className="showcase-step h-screen flex items-center"
                  id="step-ai"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      AI recognition
                    </h3>
                    <p className="mt-3 text-slate-300 max-w-md">
                      AI model detects, tracks, and recognizes faces in
                      real-time using facial embeddings.
                    </p>
                  </motion.div>
                </div>

                <div
                  className="showcase-step h-screen flex items-center"
                  id="step-attendance"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      Attendance marking
                    </h3>
                    <p className="mt-3 text-slate-300 max-w-md">
                      Attendance is automatically recorded and synced to the
                      admin dashboard.
                    </p>
                  </motion.div>
                </div>

                <div
                  className="showcase-step h-screen flex items-center"
                  id="step-security"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      Security & alerts
                    </h3>
                    <p className="mt-3 text-slate-300 max-w-md">
                      Unknown individuals trigger instant alerts for campus
                      security.
                    </p>
                  </motion.div>
                </div>

                <div
                  className="showcase-step h-screen flex items-center"
                  id="step-final"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      Complete ecosystem
                    </h3>
                    <p className="mt-3 text-slate-300 max-w-md">
                      A complete smart attendance ecosystem for modern schools,
                      from camera to dashboard.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="lg:hidden mx-auto max-w-3xl px-6 py-10 space-y-6 bg-slate-900/60">
          <h3 className="text-xl font-semibold text-white">
            Smart AI Camera System
          </h3>
          <p className="text-slate-300">
            4MP lens • 90°–120° FoV • Real-time recognition • Auto attendance
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-lg bg-slate-800/70 p-4">
              Lens — high-resolution capture
            </div>
            <div className="rounded-lg bg-slate-800/70 p-4">
              Wide-angle view for groups
            </div>
            <div className="rounded-lg bg-slate-800/70 p-4">
              AI recognition & alerts
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
