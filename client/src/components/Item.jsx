import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import { mapAtom } from '../lib/socket';
import { useMemo } from 'react';
import { useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';

export const Item = ({ item }) => {
  const { name, size, gridPosition, rotation } = item;
  const [map] = useAtom(mapAtom);
  const { scene } = useGLTF(`models/items/${name}.glb`, true);

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  return (
    <primitive
      object={clone}
      position={[
        size[0] / map.gridDivision / 2 + gridPosition[0] / map.gridDivision,
        0,
        size[1] / map.gridDivision / 2 + gridPosition[0] / map.gridDivision,
      ]}
      rotation-y={((rotation || 0) * Math.PI) / 2}
    />
  );
};
