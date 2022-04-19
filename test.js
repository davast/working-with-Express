function catAndMouse(x, y, z) {
  if (Math.abs(z - x) > Math.abs(z - y)) {
    console.log("Cat A");
  } else if (Math.abs(z - x) < Math.abs(z - y)) {
    console.log("Cat B");
  } else {
    console.log("Mouse C");
  }
}

catAndMouse(2, 5, 4);
