import {
  CameraControls,
  Environment,
  Float,
  MeshReflectorMaterial,
  PerspectiveCamera,
  RenderTexture,
  Stage,
  Text,
  useFont,
} from "@react-three/drei";
import { useAtom } from "jotai";
import { useRef } from "react";
import { Color } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils";
import { Camping } from "./Camping";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls, Html } from "@react-three/drei";
import { Interface } from "./interface";
import { ScrollManager } from "./ScrollMAnager";
import React, { Suspense, useEffect, useState } from "react";
import { Menu } from "./Menue";
import { cloneUniformsGroups, DoubleSide } from "three";
import { Reflector, useTexture, useGLTF } from "@react-three/drei";
import Nav from "./Nav";
import { motion } from "framer-motion-3d";



const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(0);
  const [sevenwmodel, setDisplayseven] = useState(0);
  const [sideanimate, setSideanimte]=useState(0);

  const anime =()=>{
    setSideanimte(1);
  }
  return (
    <motion.group
    transition={{
      duration:1,
    }}
    >
      {(sideanimate===0)?<Intro/>:<SideIntro/>}
      {(sideanimate===0)?<Float floatIntensity={1} speed={1.5}>
      <City/>
      </Float>:<City/>}
      
      {/* <Environment preset="sunset" /> */}
      <ambientLight intensity={1} />
      <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-50, 0, -40]} intensity={0.7} />
          <ScrollControls pages={(sideanimate===0)?1:10} damping={0.1}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
            </Scroll>
            {(sideanimate===0)?
            <Scroll html><div className="h-screen w-screen flex items-center justify-center" ><button onClick={anime} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">SRIJAN</button></div>:<></></Scroll>:
            <Scroll html>
              <Nav />
              <Interface onSectionChange = {setSection} />
            </Scroll>}
            
          </ScrollControls>
    </motion.group>
  );
};

function City(){
  return(
    <>
    <Text
        font={"fonts/Poppins-Black.ttf"}
        position-x={-1.3}
        position-y={1.5}
        position-z={1}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={degToRad(30)}
      >
        Around The{"\n"}
        World
        <meshBasicMaterial
          color={bloomColor}
          toneMapped={false}
        >
        </meshBasicMaterial>
      </Text>
      <group rotation-y={degToRad(-25)} position-x={3}>
        <Camping scale={0.6} html />
        <mesh visible={false}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </group>
      </>
  )
}

function Intro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(0,5,15),//state.mouse.x * 5, 3 + state.mouse.y * 2, 14
      1
    );
    state.camera.lookAt(0, 0, 0);
  });
}
function SideIntro() {
  const [vec] = useState(() => new THREE.Vector3());
  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(6,4,7),//state.mouse.x * 5, 3 + state.mouse.y * 2, 14
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function VideoText(props) {
  const [video] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/Srijan.mp4",
      crossOrigin: "Anonymous",
      loop: true,
      muted: true,
    })
  );
  useEffect(() => void video.play(), [video]);

  return (
    <Text 
    font={"fonts/Poppins-Black.ttf"}
        position-x={-1.3}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8}
        textAlign="center"
        rotation-y={degToRad(30)}
        anchorY={"bottom"}
    >
      SRIJAN
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  );
}

useFont.preload("fonts/Poppins-Black.ttf");
