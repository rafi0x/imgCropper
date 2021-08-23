let showImg = document.querySelector(".avatar-circle");
let mainImg = document.querySelector(".mainImg");
let avatarForm = document.querySelector("#avatarForm");
let save = document.querySelector(".save");
let uploader = document.querySelector("#avatarUploader");
let modal = document.querySelector("#modal");
let cropper = "";

// function to decode the base64encoded image data
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);
    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

// starts from here

// on change show image with crop options
uploader.addEventListener("change", (file) => {
  if (file.target.files.length) {
    // start file reader
    let reader = new FileReader();
    reader.onload = (data) => {
      if (data.target.result) {
        modal.classList.add("show");
        // create new img element
        let img = document.createElement("img");
        img.src = data.target.result;
        mainImg.appendChild(img);

        // init cropper js
        cropper = new Cropper(img, {
          viewMode: 1,
          aspectRatio: 1,
          minCanvasWidth: 250,
          minCanvasHeight: 150,
        });
      }
    };
    reader.readAsDataURL(file.target.files[0]);
  }
});

// save on click
save.addEventListener("click", async (e) => {
  e.preventDefault();
  // get result to data uri
  let imgSrc = cropper.getCroppedCanvas().toDataURL();
  let srcBlock = imgSrc.split(";");
  let contentType = srcBlock[0].split(":")[1];
  let realData = srcBlock[1].split(",")[1];

  // convert image
  let blob = b64toBlob(realData, contentType);

  // form data
  let formData = new FormData(avatarForm);

  // here add image with name into the form, server will recive image with name 'image' .
  formData.append("image", blob);

  try {
    // send image to server
    await fetch("/", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.log(error);
  }
  // this will give a reload after upload
  setTimeout(() => {
    location.reload();
  }, 1000);
});


// if modal closed, modal will be clear
$("#modal").on("hidden.bs.modal", function () {
  mainImg.removeChild(mainImg.children[0]);
  cropper.destroy();
});
