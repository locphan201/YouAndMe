function getMonth(index) {
    var months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    return months[index];
}

function loadImages() {
    fetch(`https://youandme.locphan201.repl.co/images/`, {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        galleryTab.innerHTML = "";
        if (data.images.length == 0) {
            galleryTab.innerHTML = "<br><p>No Image Available</p>";
            return;
        }

        const imagePromises = data.images.map(filename => {
            return new Promise((resolve, reject) => {
                const month = filename.substring(4, 6);
                const year = filename.substring(0, 4);

                const imageElement = document.createElement("img");
                imageElement.src = `https://youandme.locphan201.repl.co/images/${filename}`;

                imageElement.addEventListener("click", () => {
                    openImageDisplay();
                    document.getElementById("selected-img").src = `https://youandme.locphan201.repl.co/images/${filename}`;
                });

                imageElement.onload = () => {
                    const imgDiv = document.getElementById(`${month}-${year}`);
                    if (imgDiv) {
                        imgDiv.appendChild(imageElement);
                    } else {
                        const dateTag = document.createElement("h3");
                        dateTag.textContent = `${getMonth(parseInt(month, 10)-1)}, ${year}`;
                        
                        const newImgDiv = document.createElement("div");
                        newImgDiv.className = "image-section";
                        newImgDiv.id = `${month}-${year}`;
                        newImgDiv.appendChild(imageElement);
                        
                        galleryTab.appendChild(dateTag);
                        galleryTab.appendChild(newImgDiv);
                    }

                    resolve(); 
                };

                imageElement.onerror = () => {
                    reject(new Error(`Failed to load image: ${filename}`));
                };
            });
        });

        return Promise.all(imagePromises);
    })
    .catch(error => console.error(error));
}

// Function to display selected images
function displaySelectedImages() {
    const input = document.getElementById("imageInput");
    const selectedImgList = document.getElementById("selected-img-list");
    selectedImgList.innerHTML = ""; // Clear the existing content
  
    // Loop through the selected files and create image elements
    for (const file of input.files) {
        const imgElement = document.createElement("img");
        imgElement.src = URL.createObjectURL(file);
        selectedImgList.appendChild(imgElement);
    }
}
document.getElementById("imageInput").addEventListener("change", displaySelectedImages);
  
function compressAndUpload() {
    const input = document.getElementById("imageInput");
    const files = input.files;

    if (files.length > 0) {
        const uploadPromises = [];

        for (const file of files) {
            const uploadPromise = new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = function () {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");

                        const maxWidth = 800;
                        const maxHeight = 600;

                        let newWidth = img.width;
                        let newHeight = img.height;

                        if (img.width > maxWidth) {
                            newWidth = maxWidth;
                            newHeight = (img.height * maxWidth) / img.width;
                        }

                        if (img.height > maxHeight) {
                            newHeight = maxHeight;
                            newWidth = (img.width * maxHeight) / img.height;
                        }

                        canvas.width = newWidth;
                        canvas.height = newHeight;

                        ctx.drawImage(img, 0, 0, newWidth, newHeight);

                        canvas.toBlob((blob) => {
                            const compressedFile = new File([blob], file.name, {
                                type: "image/jpeg",
                                lastModified: Date.now()
                            });

                            const formData = new FormData();
                            formData.append("image", compressedFile);

                            fetch(`https://youandme.locphan201.repl.co/images/upload`, {
                                    method: "POST",
                                    body: formData
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    resolve(); // Resolve the promise when upload is successful
                                })
                                .catch(error => {
                                    console.error(error);
                                    reject(error);
                                });
                        }, "image/jpeg", 0.8);
                    };
                };

                reader.readAsDataURL(file);
            });

            uploadPromises.push(uploadPromise);
        }

        // Wait for all uploads to finish before further processing
        Promise.all(uploadPromises)
            .then(() => {
                // All uploads completed
                alert("All uploads completed");
                loadImages();
                closeGalleryForm();
            })
            .catch(error => console.error(error));
    }
}

function deleteImage() {
    const parts = document.getElementById("selected-img").src.split('/');
    const filename = parts[parts.length-1]
    fetch(`https://youandme.locphan201.repl.co/images/${filename}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadImages();
        closeImageDisplay();
    })
    .catch(error => {
        alert(error.error);
    });
}
