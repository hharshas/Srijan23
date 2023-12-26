import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useState } from "react";
import { Experience } from "./components/Experience";
import { LoadingScreen } from "./components/LoadingScreen";


function App() {
  const [started, onStarted] = useState(false);
  const isMobile = window.innerWidth < 768;
  return (
    <>
    <LoadingScreen started={started} setStarted={onStarted} />
      <Canvas shadows camera={{ position: [0, 0, 300], fov: isMobile?62:42}}>
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Suspense>
          {started && (<Experience />)}
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </>
  );
}


export default App;
