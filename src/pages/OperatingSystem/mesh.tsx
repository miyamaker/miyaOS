import * as THREE from 'three'
import { ShadertoyTexture } from 'three-shadertoy-texture'

import { fs } from './webgl'

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Test cube:
const material = new THREE.MeshBasicMaterial({})

const texture = new ShadertoyTexture(sizes.width, sizes.height)
texture.image.shader = fs

material.map = texture.texture

export default material
