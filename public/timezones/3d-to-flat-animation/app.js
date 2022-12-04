let scene;
let camera;
let renderer;

const DISPLAY_STARS = true;
const BUMP_SCALE = 0.2;
const EARTH_MAP = "./texture/earth_nasa.jpg";

function main() {
  const canvas = document.querySelector("#c");

  canvas.parentElement.style.background = `url(${EARTH_MAP}) center center no-repeat`;
  canvas.parentElement.style.backgroundSize = "cover";

  canvas.style.opacity = 1;
  canvas.style.transition = "opacity 1s ease-in-out";

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );
  camera.position.z = 2;
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.autoClear = false;
  renderer.setClearColor(0x00000, 0.0);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  // create earthgeometry

  const earthgeometry = new THREE.SphereGeometry(0.7, 32, 32);

  const eatrhmaterial = new THREE.MeshPhongMaterial({
    // roughness: 1,
    // metalness: 0,
    map: THREE.ImageUtils.loadTexture(EARTH_MAP),
    // map: THREE.ImageUtils.loadTexture("texture/earthmap1k.jpg"),
    // map: THREE.ImageUtils.loadTexture("texture/specularmap.jpg"), // mode sepia, voyage dans le temps ?

    bumpMap: THREE.ImageUtils.loadTexture("texture/earthbump.jpg"),
    bumpScale: BUMP_SCALE,
  });

  const earthmesh = new THREE.Mesh(earthgeometry, eatrhmaterial);

  scene.add(earthmesh);

  // set ambientlight

  const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientlight);

  // set point light

  const pointerlight = new THREE.PointLight(0xffffff, 0.9);

  // set light position

  pointerlight.position.set(5, 3, 5);
  scene.add(pointerlight);

  let starmesh;
  if (DISPLAY_STARS) {
    const stargeometry = new THREE.SphereGeometry(80, 64, 64);

    const starmaterial = new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture("texture/galaxy.png"),
      side: THREE.BackSide,
    });

    starmesh = new THREE.Mesh(stargeometry, starmaterial);

    scene.add(starmesh);
  }

  let doRotate = true;

  const animate = () => {
    if (doRotate) {
      requestAnimationFrame(animate);
    }

    earthmesh.rotation.y += -0.006;
    // cloudmesh.rotation.y += 0.0015;

    if (DISPLAY_STARS) {
      starmesh.rotation.y += 0.0005;
    }

    render();
  };

  const render = () => {
    renderer.render(scene, camera);
  };

  animate();

  const stopRotation = () => {
    doRotate = false;
    cancelAnimationFrame(animate);
  };

  const startRotation = () => {
    doRotate = true;
    animate();
  };

  const toggleRotation = () => {
    if (doRotate) {
      stopRotation();
    } else {
      startRotation();
    }
  };

  // when I press space, then the animation is stopped.
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      toggleRotation();
    }
  });

  const STEPS = 60;
  const CENTER_TO_FLAT_STEPS = 45;
  const FLAT_TO_FADE_STEPS = 50;

  const fade = () => {
    canvas.style.opacity = 0;
  };

  const flatten = () => {
    stopRotation();

    centerMap(() => doFlat(fade));
  };

  let centerMapStep = 0;
  let centerMapNextStarted = false;
  let centerMapInitialValue;

  const centerMap = (next) => {
    if (!centerMapInitialValue) {
      centerMapInitialValue = earthmesh.rotation.y;
    }

    // remove bump
    eatrhmaterial.bumpScale -= Math.max(0, BUMP_SCALE / STEPS);

    // center the map
    eatrhmaterial.map.offset = new THREE.Vector2(
      eatrhmaterial.map.offset.x + 0.25 / STEPS,
      0
    );

    // rotate to start position
    earthmesh.rotation.y -= centerMapInitialValue / STEPS;

    if (centerMapStep < STEPS) {
      centerMapStep++;
      requestAnimationFrame(() => centerMap(next));

      render();
    }

    if (centerMapStep >= CENTER_TO_FLAT_STEPS && !centerMapNextStarted) {
      centerMapNextStarted = true;
      next();
    }
  };

  let doFlatNbSteps = 0;
  let doFlatNextStarted = false;

  const doFlat = (next) => {
    // flatten the earth
    earthmesh.scale.z = Math.max(0.001, earthmesh.scale.z - 1 / STEPS);

    if (doFlatNbSteps < STEPS) {
      doFlatNbSteps++;
      requestAnimationFrame(() => doFlat(next));

      render();
    }

    if (doFlatNbSteps >= FLAT_TO_FADE_STEPS && !doFlatNextStarted) {
      doFlatNextStarted = true;
      next();
    }
  };

  // when I press on "z", let's zoom the earth and display the background image in full screen
  document.addEventListener("keydown", (event) => {
    if (event.code === "KeyZ") {
      flatten();
    }
  });
}

window.onload = main;
