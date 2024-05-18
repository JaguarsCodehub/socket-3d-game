import {
  ContactShadows,
  Environment,
  OrbitControls,
  useCursor,
} from '@react-three/drei';
import { Astronaut } from './Astronaut';
import { Item } from './Item';
import { useAtom } from 'jotai';
import { charactersAtom, mapAtom, socket, userAtom } from '../lib/socket';
import * as THREE from 'three';
import { useState } from 'react';

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [user] = useAtom(userAtom);

  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset='sunset' />
      <ambientLight intensity={0.3} />
      <OrbitControls />

      {map.items.map((item, idx) => (
        <Item key={`${item.name}-${idx}`} item={item} />
      ))}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        position-x={map.size[0] / 2}
        position-z={map.size[1] / 2}
        onClick={(e) => socket.emit('move', [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={map.size} />
        <meshStandardMaterial color='#f0f0f0' />
      </mesh>
      {characters.map((character) => (
        <Astronaut
          key={character.id}
          id={character.id}
          position={
            new THREE.Vector3(
              character.position[0],
              character.position[1],
              character.position[2]
            )
          }
          helmetColor={character.helmetColor}
          bodyColor={character.bodyColor}
          feetColor={character.feetColor}
        />
      ))}
    </>
  );
};
