document.addEventListener("DOMContentLoaded", async function () {

    // -----------------------------
    // ELEMENTS
    // -----------------------------
    const video = document.getElementById("video");
    const captureCanvas = document.getElementById("captureCanvas");
    const uploadCanvas = document.getElementById("uploadCanvas");
    const captureContext = captureCanvas.getContext("2d");
    const uploadContext = uploadCanvas.getContext("2d");
    const uploadedPhoto = document.getElementById("uploadedPhoto");
    const capturedPhoto = document.getElementById("capturedPhoto");
    const imageUploadInput = document.querySelector('[name="image-upload"]');

    const errorAlert = document.getElementById("errorAlert");
    const warningAlert = document.getElementById("warningAlert");
    const matchText = document.getElementById("match");
    const scoreText = document.getElementById("score");

    // -----------------------------
    // 1. LOAD MODELS
    // -----------------------------
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

    console.log("FaceAPI Models Loaded ✅");

    // -----------------------------
    // 2. START CAMERA
    // -----------------------------
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => (video.srcObject = stream))
            .catch(err => console.log(err));
    }

    // -----------------------------
    // 3. UPLOAD BUTTON
    // -----------------------------
    document.getElementById("upload").addEventListener("click", () => {
        imageUploadInput.click();
    });

    // -----------------------------
    // 4. HANDLE FILE UPLOAD
    // -----------------------------
    imageUploadInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const ext = file.name.split(".").pop().toLowerCase();
        if (!["png", "jpg", "jpeg"].includes(ext)) {
            alert("Please upload a valid image!");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                setImageToCanvas(img, uploadedPhoto, uploadCanvas, uploadContext);
            };
        };
        reader.readAsDataURL(file);
    });

    // -----------------------------
    // 5. CAPTURE BUTTON
    // -----------------------------
    document.getElementById("capture").addEventListener("click", function () {
        setImageToCanvas(video, capturedPhoto, captureCanvas, captureContext, video.videoWidth, video.videoHeight);
    });

    // -----------------------------
    // 6. VERIFY BUTTON
    // -----------------------------
    document.getElementById("verify").addEventListener("click", verifyFacesLocal);

    // -----------------------------
    // CANVAS HELPER
    // -----------------------------
    function setImageToCanvas(image, id, canvas, context, width = image.width, height = image.height) {
        const ratio = width / height;
        let newWidth = canvas.width;
        let newHeight = newWidth / ratio;

        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * ratio;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, newWidth, newHeight);
        id.src = canvas.toDataURL("image/png");
    }

    // -----------------------------
    // 7. FACE VERIFICATION
    // -----------------------------
    async function verifyFacesLocal() {

        matchText.innerHTML = "";
        scoreText.innerHTML = "";
        errorAlert.style.display = "none";
        warningAlert.style.display = "none";

        const img1 = await faceapi
            .detectSingleFace(capturedPhoto)
            .withFaceLandmarks()
            .withFaceDescriptor();

        const img2 = await faceapi
            .detectSingleFace(uploadedPhoto)
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!img1 || !img2) {
            alert("Face not detected in one or both photos!");
            return;
        }

        const distance = faceapi.euclideanDistance(img1.descriptor, img2.descriptor);
        const percentage = ((1 - distance) * 100).toFixed(2);

        scoreText.innerHTML = percentage + "% Match Score";

        if (distance < 0.55) {
            matchText.innerHTML = "✔ Face Verified";
            matchText.style.color = "green";

            setTimeout(() => {
                window.location.href = "./VoterVerification2.html";
            }, 1000);

        } else {
            matchText.innerHTML = "❌ Wrong Person";
            matchText.style.color = "red";
        }
    }

});
