function multiplyMatrixVector(matrix, vector) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < vector.length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result.push(sum);
    }
    return result;
}

function createProjectionMatrix() {
  const fovDegrees = 60;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;

  const fovRadians = math.unit(fovDegrees, 'deg').to('rad').value;
  const rangeInv = 1.0 / (near - far);
  
  const a = math.cot(fovRadians / 2) / aspectRatio;
  const b = math.cot(fovRadians / 2);
  const c = (far + near) * rangeInv;
  const d = -2*far*near/(far-near);

  const projectionMatrix = [
    [a, 0, 0, 0],
    [0, b, 0, 0],
    [0, 0, c, d],
    [0, 0, -1, 0]
  ];
  
  return projectionMatrix;

}

function initialize() {
    const canvas = document.getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let cubePoints = [
        [-10, 10, 50],
        [10, 10, 50],
        [-10, -10, 50],
        [10, -10, 50],
        [-10, 10, 70],
        [10, 10, 70],
        [-10, -10, 70],
        [10, -10, 70]
    ];
    const projectionMatrix = createProjectionMatrix();
    const homogenous = multiplyMatrixVector(projectionMatrix, cubePoints[0]);
    // Do perspective division
    let x = homogenous[0];
    let y = homogenous[1];
    let z = homogenous[2];
    const w = homogenous[3];
    x /= w;
    y /= w;
    z /= w;
    const normalized = [x, y, z];
    // Scale and center the coordinates
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    x = (1 - x) * (screenWidth / 2)
    y = (y + 1) * (screenHeight / 2)
    const twoD = [x, y];
    console.log(twoD);
}

function draw(ctx, squarePoints) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const projectionMatrix = createProjectionMatrix();
    squarePoints.forEach(function(point) {
        // Project 3D point
        point = multiplyMatrices([point], projectionMatrix)[0];
        //Reverse x direction
        let x = point[0];
        let y = point[1];
        let w = point[3];
        //x /= w;
        //y /= w;
        console.log(x, y);
        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, 10, 10);
    });
    requestAnimationFrame(function() {
        draw(ctx, squarePoints);
    })
}

initialize();
