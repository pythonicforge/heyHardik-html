let siriWave; // Declare siriWave globally

// Function to initialize SiriWave with initial settings
function initializeSiriWave() {
    const container = document.getElementById("animation-container");
    const initialWidth = window.innerWidth; // Initial width

    // Initialize SiriWave instance
    siriWave = new SiriWave({
        container: container,
        width: initialWidth,
        height: 200,
        color: "#000",
        speed: 0.06,
        amplitude: 0.3,
        frequency: 9
    });
    siriWave.start();
}

// Function to update SiriWave width based on window width
function updateSiriWaveWidth() {
    if (siriWave) {
        const newWidth = window.innerWidth; // Get current window width
        siriWave.setWidth(newWidth); // Set new width to SiriWave instance
    }
}

// Initialize SiriWave when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSiriWave();

    // Listen for resize events on the window and update SiriWave width dynamically
    window.addEventListener('resize', function() {
        updateSiriWaveWidth();
    });

    // If the window is resized immediately after load, ensure SiriWave adjusts
    window.addEventListener('load', function() {
        updateSiriWaveWidth();
    });
});

// Function to speak text using SpeechSynthesis
function speakText(text) {
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language if needed
    utterance.onstart = function(event) {
        // Start SiriWave animation or adjust parameters
        setSiriWaveAmplitude(1.5); // Example adjustment
    };
    utterance.onend = function(event) {
        // Reset SiriWave amplitude after speech ends
        setSiriWaveAmplitude(0.3);
    };
    window.speechSynthesis.speak(utterance);
}

// Function to set SiriWave amplitude directly based on audio input
function setSiriWaveAmplitude(amplitude) {
    if (siriWave) {
        siriWave.setAmplitude(amplitude); // Set SiriWave amplitude directly
    }
}

// Event listener for the Speak button
document.getElementById("speak-button").addEventListener("click", function() {
    var textToSpeak = "Hello, this is a demo text"; // Replace with your text or get dynamically
    speakText(textToSpeak);
});

// Function to update SiriWave amplitude based on audio input
function updateSiriWaveAmplitude(audioContext) {
    var analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    function update() {
        analyser.getByteFrequencyData(dataArray);
        var amplitude = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength / 256;
        setSiriWaveAmplitude(amplitude); // Update SiriWave amplitude based on audio input
        requestAnimationFrame(update);
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            var source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            update();
        })
        .catch(function(err) {
            console.error('Error getting audio input: ', err);
        });
}
