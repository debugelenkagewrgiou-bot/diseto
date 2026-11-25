
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const DEFAULT_DEPTH_RANGE = 50;
const MAX_HORIZONTAL_OFFSET = 8;
const MAX_VERTICAL_OFFSET = 8;

const DEFAULT_FADE_SETTINGS = {
  fadeIn: { start: 0.05, end: 0.25 },
  fadeOut: { start: 0.4, end: 0.43 },
};

const DEFAULT_BLUR_SETTINGS = {
  blurIn: { start: 0, end: 0.1 },
  blurOut: { start: 0.4, end: 0.43 },
  maxBlur: 8,
};

function createClothMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      map: { value: null },
      resolution: { value: new THREE.Vector2(1, 1) },
      opacity: { value: 1 },
      blurAmount: { value: 0 },
      scrollForce: { value: 0 },
      time: { value: 0 },
      isHovered: { value: 0 },
    },
    vertexShader: `
      uniform float scrollForce;
      uniform float time;
      uniform float isHovered;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float curveIntensity = scrollForce * 0.3;
        float distanceFromCenter = length(pos.xy);
        float curve = distanceFromCenter * distanceFromCenter * curveIntensity;

        float ripple1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float ripple2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;

        float clothEffect =
          (ripple1 + ripple2) * abs(curveIntensity) * 2.0;

        float flagWave = 0.0;

        if (isHovered > 0.5) {
          float wavePhase = pos.x * 3.0 + time * 8.0;
          float waveAmplitude = sin(wavePhase) * 0.1;
          float dampening = smoothstep(-0.5, 0.5, pos.x);

          flagWave = waveAmplitude * dampening;

          float secondaryWave =
            sin(pos.x * 5.0 + time * 12.0) * 0.03 * dampening;

          flagWave += secondaryWave;
        }

        pos.z -= curve + clothEffect + flagWave;

        gl_Position =
          projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform vec2 resolution;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D(map, vUv);

        if (blurAmount > 0.01) {
          vec2 texelSize = 1.0 / max(resolution, vec2(1.0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;

          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));

              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }

          color = blurred / total;
        }

        float curveHighlight = abs(scrollForce) * 0.005;
        color.rgb += vec3(curveHighlight);

        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
}

function getImageSize(texture) {
  const image = texture?.image;

  return {
    width:
      image?.naturalWidth ||
      image?.videoWidth ||
      image?.width ||
      1,
    height:
      image?.naturalHeight ||
      image?.videoHeight ||
      image?.height ||
      1,
  };
}

function ImagePlane({ plane, textures, material }) {
  const meshRef = useRef(null);
  const currentTextureRef = useRef(null);

  const handlePointerEnter = useCallback(() => {
    if (material?.uniforms?.isHovered) {
      material.uniforms.isHovered.value = 1;
    }
  }, [material]);

  const handlePointerLeave = useCallback(() => {
    if (material?.uniforms?.isHovered) {
      material.uniforms.isHovered.value = 0;
    }
  }, [material]);

  useFrame(() => {
    const mesh = meshRef.current;

    if (!mesh || !material?.uniforms || !plane) return;

    const texture = textures?.[plane.imageIndex];

    if (texture && currentTextureRef.current !== texture) {
      currentTextureRef.current = texture;
      material.uniforms.map.value = texture;

      const { width, height } = getImageSize(texture);
      material.uniforms.resolution.value.set(width, height);

      const aspect = width / Math.max(height, 1);

      mesh.scale.set(
        aspect > 1 ? 2 * aspect : 2,
        aspect > 1 ? 2 : 2 / Math.max(aspect, 0.001),
        1
      );
    }

    mesh.position.set(
      plane.x,
      plane.y,
      plane.z - DEFAULT_DEPTH_RANGE / 2
    );
  });

  return (
    <mesh
      ref={meshRef}
      material={material}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <planeGeometry args={[1, 1, 16, 16]} />
    </mesh>
  );
}

function getOpacity(position, fadeSettings) {
  const { fadeIn, fadeOut } = fadeSettings;

  if (position < fadeIn.start) return 0;

  if (position <= fadeIn.end) {
    const range = Math.max(fadeIn.end - fadeIn.start, 0.0001);

    return THREE.MathUtils.clamp(
      (position - fadeIn.start) / range,
      0,
      1
    );
  }

  if (position < fadeOut.start) return 1;

  if (position <= fadeOut.end) {
    const range = Math.max(fadeOut.end - fadeOut.start, 0.0001);

    return 1 - THREE.MathUtils.clamp(
      (position - fadeOut.start) / range,
      0,
      1
    );
  }

  return 0;
}

function getBlur(position, blurSettings) {
  const { blurIn, blurOut, maxBlur } = blurSettings;

  if (position < blurIn.start) return maxBlur;

  if (position <= blurIn.end) {
    const range = Math.max(blurIn.end - blurIn.start, 0.0001);
    const progress = (position - blurIn.start) / range;

    return maxBlur * (
      1 - THREE.MathUtils.clamp(progress, 0, 1)
    );
  }

  if (position < blurOut.start) return 0;

  if (position <= blurOut.end) {
    const range = Math.max(blurOut.end - blurOut.start, 0.0001);
    const progress = (position - blurOut.start) / range;

    return maxBlur * THREE.MathUtils.clamp(progress, 0, 1);
  }

  return maxBlur;
}

function GalleryScene({
  images,
  speed = 1,
  visibleCount = 8,
  fadeSettings = DEFAULT_FADE_SETTINGS,
  blurSettings = DEFAULT_BLUR_SETTINGS,
}) {
  const { gl } = useThree();

  const velocityRef = useRef(0);
  const autoPlayRef = useRef(true);
  const lastInteractionRef = useRef(Date.now());

  const normalizedImages = useMemo(
    () =>
      images
        .map((img) =>
          typeof img === "string" ? { src: img, alt: "" } : img
        )
        .filter((img) => img?.src),
    [images]
  );

  const textureSources = useMemo(
    () => normalizedImages.map((image) => image.src),
    [normalizedImages]
  );

  const loadedTextures = useTexture(textureSources);

  const textures = useMemo(
    () =>
      Array.isArray(loadedTextures)
        ? loadedTextures
        : [loadedTextures],
    [loadedTextures]
  );

  const materials = useMemo(
    () =>
      Array.from(
        { length: visibleCount },
        () => createClothMaterial()
      ),
    [visibleCount]
  );

  const spatialPositions = useMemo(
    () =>
      Array.from({ length: visibleCount }, (_, i) => {
        const horizontalAngle = (i * 2.618) % (Math.PI * 2);
        const verticalAngle =
          (i * 1.618 + Math.PI / 3) % (Math.PI * 2);

        const horizontalRadius = (i % 3) * 1.2;
        const verticalRadius = ((i + 1) % 4) * 0.8;

        return {
          x:
            (Math.sin(horizontalAngle) *
              horizontalRadius *
              MAX_HORIZONTAL_OFFSET) / 3,
          y:
            (Math.cos(verticalAngle) *
              verticalRadius *
              MAX_VERTICAL_OFFSET) / 4,
        };
      }),
    [visibleCount]
  );

  const totalImages = textures.length;

  const planesData = useMemo(
    () =>
      Array.from({ length: visibleCount }, (_, i) => ({
        index: i,
        z:
          (DEFAULT_DEPTH_RANGE / Math.max(visibleCount, 1)) * i,
        imageIndex: totalImages ? i % totalImages : 0,
        x: spatialPositions[i]?.x ?? 0,
        y: spatialPositions[i]?.y ?? 0,
      })),
    [visibleCount, totalImages, spatialPositions]
  );

  useEffect(() => {
    return () => {
      materials.forEach((material) => material.dispose());
    };
  }, [materials]);

  const handleWheel = useCallback(
    (event) => {
      event.preventDefault();
      velocityRef.current += event.deltaY * 0.01 * speed;
      autoPlayRef.current = false;
      lastInteractionRef.current = Date.now();
    },
    [speed]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowLeft"
      ) {
        velocityRef.current -= 2 * speed;
      } else if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight"
      ) {
        velocityRef.current += 2 * speed;
      } else {
        return;
      }

      autoPlayRef.current = false;
      lastInteractionRef.current = Date.now();
    },
    [speed]
  );

  useEffect(() => {
    const canvas = gl.domElement;

    canvas.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gl, handleWheel, handleKeyDown]);

  useFrame((state, delta) => {
    if (!totalImages) return;

    const safeDelta = Math.min(delta, 0.05);

    if (Date.now() - lastInteractionRef.current > 3000) {
      autoPlayRef.current = true;
    }

    if (autoPlayRef.current) {
      velocityRef.current += 0.3 * safeDelta;
    }

    const damping = Math.pow(0.95, safeDelta * 60);
    velocityRef.current *= damping;

    const velocity = velocityRef.current;
    const time = state.clock.elapsedTime;

    materials.forEach((material) => {
      material.uniforms.time.value = time;
      material.uniforms.scrollForce.value = velocity;
    });

    planesData.forEach((plane, i) => {
      let nextZ = plane.z + velocity * safeDelta * 10;

      let wrapsForward = 0;
      let wrapsBackward = 0;

      if (nextZ >= DEFAULT_DEPTH_RANGE) {
        wrapsForward = Math.floor(nextZ / DEFAULT_DEPTH_RANGE);
        nextZ -= DEFAULT_DEPTH_RANGE * wrapsForward;
      } else if (nextZ < 0) {
        wrapsBackward = Math.ceil(-nextZ / DEFAULT_DEPTH_RANGE);
        nextZ += DEFAULT_DEPTH_RANGE * wrapsBackward;
      }

      if (wrapsForward > 0) {
        plane.imageIndex =
          (plane.imageIndex + wrapsForward) % totalImages;
      }

      if (wrapsBackward > 0) {
        const step = plane.imageIndex - wrapsBackward;

        plane.imageIndex =
          ((step % totalImages) + totalImages) % totalImages;
      }

      plane.z =
        ((nextZ % DEFAULT_DEPTH_RANGE) + DEFAULT_DEPTH_RANGE) %
        DEFAULT_DEPTH_RANGE;

      plane.x = spatialPositions[i]?.x ?? 0;
      plane.y = spatialPositions[i]?.y ?? 0;

      const normalizedPosition = plane.z / DEFAULT_DEPTH_RANGE;
      const material = materials[i];

      if (material) {
        material.uniforms.opacity.value =
          getOpacity(normalizedPosition, fadeSettings);

        material.uniforms.blurAmount.value =
          getBlur(normalizedPosition, blurSettings);
      }
    });
  });

  if (!textures.length) return null;

  return (
    <>
      {planesData.map((plane, index) => (
        <ImagePlane
          key={plane.index}
          plane={plane}
          textures={textures}
          material={materials[index]}
        />
      ))}
    </>
  );
}

function FallbackGallery({ images }) {
  const normalizedImages = images
    .map((img) =>
      typeof img === "string" ? { src: img, alt: "" } : img
    )
    .filter((img) => img?.src);

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-4">
      <p className="mb-4 text-gray-600">
        WebGL is unavailable. Showing image previews.
      </p>

      <div className="grid max-h-96 grid-cols-2 gap-4 overflow-y-auto md:grid-cols-3">
        {normalizedImages.map((image, index) => (
          <img
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt || ""}
            className="h-32 w-full rounded object-cover"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}

export default function InfiniteGallery({
  images = [],
  className = "h-96 w-full",
  style,
  speed = 1,
  visibleCount = 8,
  fadeSettings = DEFAULT_FADE_SETTINGS,
  blurSettings = DEFAULT_BLUR_SETTINGS,
}) {
  const [webglSupported, setWebglSupported] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const validImages = useMemo(
    () =>
      images.filter((image) =>
        typeof image === "string"
          ? image.length > 0
          : Boolean(image?.src)
      ),
    [images]
  );

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");

      setWebglSupported(Boolean(context));
    } catch {
      setWebglSupported(false);
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (webglSupported === false) {
    return (
      <div className={className} style={style}>
        <FallbackGallery images={validImages} />
      </div>
    );
  }

  if (webglSupported === null) {
    return (
      <div
        className={className}
        style={style}
        aria-hidden="true"
      />
    );
  }

  if (!validImages.length) {
    return <div className={className} style={style} />;
  }

  const mobileVisibleCount = Math.min(visibleCount, 4);

  return (
    <div className={className} style={style}>
      <Canvas
        camera={{
          position: [0, 0, 0],
          fov: 55,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={isMobile ? [1, 1] : [1, 1.25]}
      >
        <GalleryScene
          images={validImages}
          speed={speed}
          visibleCount={
            isMobile ? mobileVisibleCount : visibleCount
          }
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
        />
      </Canvas>
    </div>
  );
}
