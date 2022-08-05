/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, OrthographicCamera, useAnimations, useScroll} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import lerp from "lerp";

export default function Camera({ size, getBreak, children, ...props }) {
  const group = useRef();

  const { animations } = useGLTF("/models/camera-v2.glb");
  const { actions } = useAnimations(animations, group);

  const scroll = useScroll()

  useEffect(()=>{
      actions['CameraAction'].play().paused = true
  })

  const zooms = {
    'xl': [400, 250, 250, 180, 100],
    'l': [310, 180, 320, 150, 80],
    'm': [230, 140, 250, 150, 80],
    's': [125, 130, 200, 150, 60]
  }

  const groupPos = {
    'xl': [[0,0], [0,0], [-1,0], [0,0], [0,1.2]],
    'l': [[0.1,0], [0,0], [-1,-0.5], [0,0], [0,0]],
    'm': [[0,0], [0,0], [-1,-0.5], [0,0], [0,0]],
    's': [[0.1,1], [-1.5,1], [-0.8,0.5], [0,0], [0.5,3]]
    }

  useFrame((state)=>{
    const section = getBreak(scroll.offset)

    const duration = actions['CameraAction'].getClip().duration 
    const currDur = duration * scroll.offset
    actions['CameraAction'].time = currDur
    state.camera.zoom = lerp(state.camera.zoom, zooms[size][section], 0.1)
    group.current.position.y = lerp(group.current.position.y, groupPos[size][section][1], 0.1)
    group.current.position.x = lerp(group.current.position.x, groupPos[size][section][0], 0.1)
    state.camera.updateProjectionMatrix()

  })


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Camera"
          position={[1.7, 2.33, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <OrthographicCamera
            name="Camera_Orientation"
            makeDefault={true}
            far={1000}
            near={0.001}
            zoom={200}
            position={[0, 0, 0]}
          >
            {children}
          </OrthographicCamera>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/camera-v2.glb");