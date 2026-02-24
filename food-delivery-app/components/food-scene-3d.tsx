"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

// Burger - stacked cylinders (bun, patty, cheese, bun)
function Burger({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    group.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.08
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2} floatingRange={[-0.3, 0.3]}>
      <group ref={group} position={position} scale={scale}>
        {/* Bottom bun */}
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.7, 0.8, 0.3, 32]} />
          <meshStandardMaterial color="#d4882b" roughness={0.6} />
        </mesh>
        {/* Lettuce */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.85, 0.75, 0.08, 32]} />
          <meshStandardMaterial color="#4a7c3f" roughness={0.8} />
        </mesh>
        {/* Patty */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.2, 32]} />
          <meshStandardMaterial color="#4a2810" roughness={0.7} />
        </mesh>
        {/* Cheese (slightly melted - wider) */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.82, 0.78, 0.06, 32]} />
          <meshStandardMaterial color="#f5c518" roughness={0.5} />
        </mesh>
        {/* Tomato */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.08, 32]} />
          <meshStandardMaterial color="#c0392b" roughness={0.5} />
        </mesh>
        {/* Top bun */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d4882b" roughness={0.6} />
        </mesh>
        {/* Sesame seeds */}
        {[
          [0.2, 0.78, 0.3],
          [-0.15, 0.8, 0.35],
          [0.35, 0.75, -0.1],
          [-0.3, 0.76, -0.2],
          [0.05, 0.82, -0.35],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[0.3, i * 0.8, 0.2]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#f5e6c8" roughness={0.4} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Pizza - flat cylinder with toppings
function Pizza({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.15
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.1
  })

  // Random pepperoni positions
  const pepperoniPositions = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + (i % 2) * 0.3
        const r = 0.25 + (i % 3) * 0.2
        return [Math.cos(angle) * r, 0.12, Math.sin(angle) * r] as [number, number, number]
      }),
    []
  )

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      <group ref={group} position={position} scale={scale}>
        {/* Crust base */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.12, 32]} />
          <meshStandardMaterial color="#d4882b" roughness={0.7} />
        </mesh>
        {/* Sauce layer */}
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.04, 32]} />
          <meshStandardMaterial color="#c0392b" roughness={0.6} />
        </mesh>
        {/* Cheese layer */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.76, 0.76, 0.03, 32]} />
          <meshStandardMaterial color="#f5deb3" roughness={0.5} />
        </mesh>
        {/* Pepperoni */}
        {pepperoniPositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
            <meshStandardMaterial color="#8b1a1a" roughness={0.6} />
          </mesh>
        ))}
        {/* Basil leaves */}
        {[
          [0.1, 0.13, 0.15],
          [-0.2, 0.13, -0.1],
          [0.3, 0.13, -0.25],
        ].map((pos, i) => (
          <mesh key={`basil-${i}`} position={pos as [number, number, number]} rotation={[0, i * 1.2, 0]}>
            <sphereGeometry args={[0.05, 8, 6]} />
            <meshStandardMaterial color="#2d5a1e" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Drink - glass/cup with straw
function Drink({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    group.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.2
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
  })

  return (
    <Float speed={1.8} rotationIntensity={0.2} floatIntensity={1.5} floatingRange={[-0.4, 0.4]}>
      <group ref={group} position={position} scale={scale}>
        {/* Glass */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.28, 1.2, 32, 1, true]} />
          <meshStandardMaterial
            color="#e8e8e8"
            transparent
            opacity={0.35}
            roughness={0.1}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Liquid */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.33, 0.26, 1, 32]} />
          <meshStandardMaterial color="#dc2626" transparent opacity={0.8} roughness={0.3} />
        </mesh>
        {/* Ice cubes */}
        {[
          [0.1, 0.2, 0.05],
          [-0.08, 0.35, -0.08],
          [0.05, 0.1, -0.1],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[i * 0.5, i * 0.8, i * 0.3]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.5} roughness={0.1} />
          </mesh>
        ))}
        {/* Straw */}
        <mesh position={[0.1, 0.3, 0.05]} rotation={[0, 0, 0.12]}>
          <cylinderGeometry args={[0.025, 0.025, 1.6, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        {/* Lime wedge */}
        <mesh position={[0.3, 0.5, 0]} rotation={[0, 0, 0.3]}>
          <sphereGeometry args={[0.1, 8, 8, 0, Math.PI]} />
          <meshStandardMaterial color="#a3c44a" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  )
}

// Floating particles for atmosphere
function Particles() {
  const count = 40
  const mesh = useRef<THREE.InstancedMesh>(null!)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 3,
        ],
        scale: Math.random() * 0.06 + 0.02,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed + particle.offset
      dummy.position.set(
        particle.position[0] + Math.sin(t) * 0.5,
        particle.position[1] + Math.cos(t * 0.7) * 0.3,
        particle.position[2]
      )
      dummy.scale.setScalar(particle.scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#dc2626" transparent opacity={0.2} />
    </instancedMesh>
  )
}

// Soft glowing orb
function GlowOrb({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  return (
    <Float speed={0.8} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.08}
          distort={0.3}
          speed={1.5}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

export function FoodScene3D() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#dc2626" />
        <pointLight position={[0, 4, 2]} intensity={0.5} color="#ff6b6b" />

        {/* Food items */}
        <Burger position={[-4.5, 1.5, -1]} scale={0.9} />
        <Pizza position={[4.5, -1, -2]} scale={0.8} />
        <Drink position={[-3.5, -2.5, -1]} scale={0.75} />

        {/* Additional smaller items in background */}
        <Burger position={[3.5, 2.5, -4]} scale={0.45} />
        <Drink position={[5, 1.5, -3]} scale={0.5} />
        <Pizza position={[-4, -0.5, -5]} scale={0.4} />

        {/* Atmospheric elements */}
        <Particles />
        <GlowOrb position={[-3, 2, -4]} color="#dc2626" size={2} />
        <GlowOrb position={[4, -1, -5]} color="#ff4444" size={2.5} />
        <GlowOrb position={[0, 0, -6]} color="#333333" size={3} />
      </Canvas>
    </div>
  )
}
