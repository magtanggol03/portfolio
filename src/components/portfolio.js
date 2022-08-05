import React, {useRef, Suspense, useState, useEffect} from "react";
import {Canvas, useThree, useFrame } from "@react-three/fiber";
import {Mask, useMask, Html, Image, useScroll, ScrollControls, Scroll, useAspect} from "@react-three/drei";
import * as THREE from 'three'

import { Link } from "react-router-dom";

import { state, damp } from '../utils'
import { useSnapshot } from 'valtio'

import Video from "./video"

const VideoMask = ({scale, url, position, index, ...props}) => {
  const maskRef = useRef()
  console.log('mask video', index)
  return(
    <>
    <group ref={props.ref}>
      <Mask id={index}>
        <planeBufferGeometry args={scale}/>
      </Mask>
    </group>
    <Video position={position} scale={scale} aspect={[1280, 1080]} url={url} index={index}/>
    </>
  )
}

const Item = ({index, position, scale, ...props}) => {
  const ref = useRef()
  const scroll = useScroll()
  const { clicked, urls } = useSnapshot(state)
  const [hovered, hover] = useState(false)

  let project 
  const videoFlag = 0

  //const click = () => (state.clicked = index === clicked ? null : index)
  //const over = () => hover(true)
  //const out = () => hover(false)

  useFrame((state, delta) => {
    //const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
    //ref.current.material.scale[1] = ref.current.scale.y = damp(ref.current.scale.y, clicked === index ? 5 : 4 + y, 8, delta)
    //ref.current.material.scale[0] = ref.current.scale.x = damp(ref.current.scale.x, clicked === index ? 4.7 : scale[0], 6, delta)
    //if (clicked !== null && index < clicked) ref.current.position.x = damp(ref.current.position.x, position[0] - 2, 6, delta)
    //if (clicked !== null && index > clicked) ref.current.position.x = damp(ref.current.position.x, position[0] + 2, 6, delta)
    //if (clicked === null || clicked === index) ref.current.position.x = damp(ref.current.position.x, position[0], 6, delta)
  })

  /*
  if (props.url.split(".")[1] !== 'mp4') {
  project = [<Image ref={ref} {...props} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />];
  } else {
  project = [];
  }
  */

  //console.log(scale)
  //console.log(index)
  //    <VideoMask scale={scale} position={position} url={props.url} aspect={[1920, 1080]} index={index} />

  return (
    <VideoMask index={1} scale={scale} position={position} aspect={[1920, 1080]} url={props.url} />
  )
}

function Items({ w = 0.8, gap = 0.15 }) {
  const { urls } = useSnapshot(state)
  const { width } = useThree((state) => state.viewport)
  const xW = w + gap

  return (
    <ScrollControls horizontal damping={10} pages={(width - xW + urls.length * xW) / width}>
      <Scroll>
        {urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, -10]} scale={[w, 2, 1]} url={url} />)}
      </Scroll>
    </ScrollControls>
  )
}

export default function Portfolio() {

  return (
    <>
      <Canvas 
        shadows
        camera={{position:[0, 0, 10], zoom:5}}
        style={{background: 'white'}}>
        <Suspense fallback={null}>
          <Items />
          {/*<VideoMask index={1} scale={[1, 2, 1]} position={[0, 0, -9.8]} aspect={[1920, 1080]} url='/portfolio/13.mp4' />*/}
        </Suspense>
      </Canvas>
      <Link to="/"> Back to Main </Link>
    </>
  );
}