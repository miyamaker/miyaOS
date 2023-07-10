import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Ref } from 'react'
import { useMemo, useRef } from 'react'
import type { Mesh } from 'three'

import { fs } from './webgl'

const FullSizeObject = () => {
  const { viewport } = useThree()
  const mesh = useRef<Mesh>()
  useFrame(() => {
    if (mesh.current) {
      mesh.current.scale.x = viewport.width
      mesh.current.scale.y = viewport.height
    }
  })
  /*
  const vertexShader = `
    varying vec3 Normal;
    varying vec3 Position;

    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  */
  const data = useMemo(
    () => ({
      uniforms: {
        iResolution: { value: { x: viewport.width, y: viewport.height } },
        iTime: { value: 10.0 },
      },
      fragmentShader: fs,
    }),
    [viewport.width, viewport.height]
  )

  return (
    <mesh ref={mesh as Ref<Mesh> | undefined}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <shaderMaterial attach="material" {...data} />
    </mesh>
  )
}

export default function ThreeFiberBg() {
  return (
    <Canvas>
      <FullSizeObject />
    </Canvas>
  )
}
