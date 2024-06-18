/**
 * This function starts a loading animation by updating a counter element.
 * The counter value increases randomly between 1 and 10, and the animation continues until the counter reaches 100.
 * The function uses setTimeout to introduce a delay between each update.
 *
 * @returns {void}
 */
function startLoader() {
    // Get the counter element by its class name
    let counterElement = document.querySelector('.counter');
    // Initialize the counter value
    let currentValue = 0;

    /**
     * This function updates the counter value and the counter element's text content.
     * It also calls itself recursively with a delay to continue the animation.
     *
     * @returns {void}
     */
    function updateCounter() {
        // If the counter value is 100, stop the animation
        if (currentValue === 100) {
            return;
        }

        // Increase the counter value by a random number between 1 and 10
        currentValue += Math.floor(Math.random() * 10) + 1;

        // If the counter value exceeds 100, set it to 100
        if (currentValue > 100) {
            currentValue = 100;
        }

        // Update the counter element's text content
        counterElement.textContent = currentValue + "%";

        // Calculate a random delay between 250 and 450 milliseconds
        let delay = Math.floor(Math.random() * 200) + 250;

        // Call the updateCounter function again with the calculated delay
        setTimeout(updateCounter, delay);
    }

    // Start the animation by calling the updateCounter function
    updateCounter();
}

if (window.innerWidth >= 768) {
    startLoader();

    gsap.from(".circles", 2, {
        top: "-100%",
        ease: "elastic.out",
        delay: 0.5,
    });

    gsap.to(".circle-inner", 1, {
        width: "75px",
        heightt: "75px",
        ease: "power4.inOut",
        delay: 2,
    })

    gsap.to(".circle-inner-rotator", 1, {
        scale: 1,
        ease: "power4.inOut",
        delay: 2.5,
    })

    gsap.to(".circles", 1.5, {
        rotation: 360,
        ease: "power4.inOut",
        delay: 3,
    })

    gsap.to(".block", 0.75, {
        display: "block",
        height: "200px",
        ease: "power4.inOut",
        delay: 4,
    })

    gsap.to(".block", 0.75, {
        width: "800px",
        ease: "power4.inOut",
        delay: 4.5,
    })

    gsap.fromTo(".container", {
        duration: 2,
        left: "100%",
        scale: 0.5,
        ease: "power4.inOut",
        delay: 4,
    }, {
        duration: 2,
        left: "50%",
        scale: 0.5,
        transform: "translateX(-50%",
        ease: "power4.inOut",
        delay: 4,
    })

    gsap.to(".block", 1.5, {
        width: "0px",
        ease: "power4.inOut",
        delay: 5,
    })

    gsap.to(".block", 1.5, {
        height: "0px",
        ease: "power4.inOut",
        delay: 6,
    })

    gsap.to(".circles", 1.5, {
        rotation: 0,
        ease: "power4.inOut",
        delay: 6.5,
    })

    gsap.to(".loader", 2.5, {
        scale: 0,
        ease: "power4.inOut",
        delay: 7,
    })

    gsap.to(".container", 2, {
        scale: 1,
        ease: "power4.inOut",
        delay: 7.5,
    })

}