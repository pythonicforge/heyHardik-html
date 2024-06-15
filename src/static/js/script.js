/**
 * Event listener for keydown events.
 * Toggles the focus of the search box when the '/' key is pressed.
 *
 * @param {KeyboardEvent} event - The event object representing the keydown event.
 * @returns {void}
 */
document.addEventListener('keydown', function(event) {
    if (event.key === '/') {
        event.preventDefault();
        toggleSearchFocus();
    }
});

/**
 * Toggles the focus of the search box.
 * If the search box is already focused, it will be blurred.
 * If the search box is not focused, it will be focused.
 *
 * @returns {void}
 */
function toggleSearchFocus() {
    // Get the search box element by its id
    const searchBox = document.getElementById('search-box');

    // Check if the search box is currently focused
    if (document.activeElement === searchBox) {
        // If the search box is focused, blur it
        searchBox.blur();
    } else {
        // If the search box is not focused, focus it
        searchBox.focus();
    }
}

window.addEventListener("DOMContentLoaded", game);

/**
 * The main game function. Initializes the game canvas, assets, and event listeners.
 *
 * @returns {void}
 */
function game() {
    // Initialize canvas and context
    const canvas = document.querySelector("canvas"),
          c = canvas.getContext("2d"),
          W = canvas.width,
          H = canvas.height,
          S = 2;

    // Define assets URLs
    const assets = [
        "https://i.ibb.co/dDcTzrQ/nowhere.png",
        "https://i.ibb.co/S7zPTv5/tumbleweed.png"
    ];

    // Array to hold loaded sprites
    const sprites = [];

    // Define world properties
    const world = { friction: 0.1, gravity: 0.1 };

    // Define tumbleweed properties
    let tumbleweed = {
        inPlay: false,
        x: -160,
        y: 200,
        r: 32,
        rotation: 0,
        xVel: 10,
        yVel: 0,
        mass: 2.5,
        restitution: 0.3
    };

    // Score counter
    let score = 0;

    /**
     * Loads an image from a given URL and returns a Promise that resolves with the loaded image.
     *
     * @param {string} url - The URL of the image to load.
     * @returns {Promise<HTMLImageElement>} - A Promise that resolves with the loaded image.
     */
    const loadSprite = url => new Promise((resolve, reject) => {
        const sprite = new Image();
        sprite.src = url;
        sprite.onload = () => resolve(sprite);
        sprite.onerror = () => reject(url);
    });

    // Load all assets and store them in the sprites array
    const spritePromises = assets.map(loadSprite);

    /**
     * Applies a force to the tumbleweed based on the mouse click position.
     *
     * @param {MouseEvent} e - The mouse click event.
     * @returns {void}
     */
    const applyForce = e => {
        const ex = e.clientX - canvas.offsetLeft,
              ey = e.clientY - (canvas.offsetTop - window.pageYOffset),
              [x, y] = [ex / canvas.offsetWidth * W, ey / canvas.offsetHeight * H];

        const insideX = Math.abs(x - tumbleweed.x) <= tumbleweed.r,
              insideY = Math.abs(y - tumbleweed.y) <= tumbleweed.r;

        if (insideX && insideY) {
            const xForce = tumbleweed.x - x, 
                  yForce = tumbleweed.y - y,
                  xAccel = xForce / tumbleweed.mass,
                  yAccel = yForce / tumbleweed.mass;

            tumbleweed.xVel += xAccel;
            tumbleweed.yVel += yAccel;

            score++;

            if (!tumbleweed.inPlay) tumbleweed.inPlay = true;
        }
    };

    // Update game state and render to the canvas
    const update = () => {
        // Clear the canvas
        c.clearRect(0, 0, W, H);

        // Draw the background image
        c.drawImage(sprites[0], 0, 0, W, H);

        // Update tumbleweed position and velocity
        tumbleweed.x += tumbleweed.xVel;

        // Apply friction to the tumbleweed's horizontal velocity
        if (tumbleweed.xVel > 0) {
            tumbleweed.xVel -= world.friction;
            if (tumbleweed.xVel < 0) tumbleweed.xVel = 0;
        } else if (tumbleweed.xVel < 0) {
            tumbleweed.xVel += world.friction;
            if (tumbleweed.xVel > 0) tumbleweed.xVel = 0;
        }

        // Check for collision with left and right bounds
        const hitLeftBound = tumbleweed.x <= tumbleweed.r && tumbleweed.inPlay,
              hitRightBound = tumbleweed.x >= W - tumbleweed.r;

        if (hitLeftBound) tumbleweed.x = tumbleweed.r;
        else if (hitRightBound) tumbleweed.x = W - tumbleweed.r;

        if (hitLeftBound || hitRightBound) tumbleweed.xVel *= -tumbleweed.restitution;

        // Update tumbleweed's vertical position and velocity
        tumbleweed.y += tumbleweed.yVel;
        tumbleweed.yVel += world.gravity;

        // Check for collision with top and bottom bounds
        const hitTopBound = tumbleweed.y <= tumbleweed.r,
              hitBottomBound = tumbleweed.y >= H - tumbleweed.r;

        if (hitTopBound) tumbleweed.y = tumbleweed.r;
        else if (hitBottomBound) {
            tumbleweed.y = H - tumbleweed.r;
            score = 0;
        }

        if (hitTopBound || hitBottomBound) tumbleweed.yVel *= -tumbleweed.restitution;

        // Update tumbleweed's rotation
        tumbleweed.rotation += tumbleweed.xVel;
        if (tumbleweed.rotation >= 360) tumbleweed.rotation -= 360;
        else if (tumbleweed.rotation < 0) tumbleweed.rotation += 360;

        // Draw the tumbleweed
        c.save();
        c.translate(tumbleweed.x, tumbleweed.y);
        c.rotate(tumbleweed.rotation * Math.PI / 180);
        c.drawImage(sprites[1], -tumbleweed.r, -tumbleweed.r, tumbleweed.r * 2, tumbleweed.r * 2);
        c.restore();

        // Draw the score
        if (score > 0) {
            c.fillStyle = "#7f7f7f";
            c.font = "48px Hind, sans-serif";
            c.textAlign = "center";
            c.fillText(score, W / 2, 48);
        }
    };

    // Render the game at 60 frames per second
    const render = () => {
        update();
        requestAnimationFrame(render);
    };

    // Set the canvas size and scale
    canvas.width = W * S;
    canvas.height = H * S;
    c.scale(S, S);

    // Load all assets and start the game
    Promise.all(spritePromises).then(loaded => {
        loaded.forEach(sprite => sprites.push(sprite));
        render();
        canvas.addEventListener("click", applyForce);
    }).catch(urls => {
        console.log(urls + " couldn’t be loaded");
    });
}
