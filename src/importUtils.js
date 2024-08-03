import Replicate from "replicate";
const replicate = new Replicate();

/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
export function addImportedImage(event, AddOnSdk) {
	if (
		document.getElementById("square-2").lastChild.localName === "img" ||
		document.getElementById("square-2").lastChild.localName === "video"
	) {
		document
			.getElementById("square-2")
			.removeChild(document.getElementById("square-2").lastChild);
	}
	document.getElementById("prev-2").style.display = "none";
	//Adding image to the preview box
	const image = document.createElement("img");
	fetch("https://localhost/generate?prompt=" + encodeURIComponent(document.getElementById("prompt-input").value), {
		method: 'GET',
		headers: {
			Accept: "image/webp"
		}
	}).then((response) => {
		response.blob().then((data) => {
			const imageURL = URL.createObjectURL(data);
			document.getElementById("blob-uri").value = imageURL;
			image.src = imageURL;
			image.style.height = "100%";
			image.style.width = "100%";
			image.style.objectFit = "contain";
			document.getElementById("square-2").appendChild(image);
			image.addEventListener("click", function () {
				AddOnSdk.app.document.addImage(data);
			});
			let preview;
			const fileReader = new FileReader();
			fileReader.addEventListener("load", () => {
				preview = fileReader.result;
			});
			fileReader.readAsDataURL(data);
			const dragCallbacks = {
				previewCallback: (image) => {
					return new URL(preview);
				},
				completionCallback: async (image) => {
					const imageBlob = await fetch(preview).then((response) =>
						response.blob()
					);
					return [{ blob: imageBlob }];
				},
			};
			try {
				AddOnSdk.app.enableDragToDocument(image, dragCallbacks);
			} catch (error) {
				console.log("Failed to enable DragToDocument:", error);
			}
		});
	});

}

function addImportedVideo(event, AddOnSdk) {
	//Adding video to preview box
	const file = event.target.files[0];
	//const result = event.target.result;
	const video = document.createElement("video");
	video.style.height = "100%";
	video.style.width = "100%";
	video.style.position = "relative";
	video.style.align = "center";
	video.style.justifyItems = "center";
	video.style.objectFit = "contain";
	video.src = URL.createObjectURL(file);
	video.load();
	document.getElementById("square-2").appendChild(video);
	video.play();

	var blob = new Blob([file], { type: file.type });
	video.addEventListener("click", function () {
		AddOnSdk.app.document.addVideo(blob);
	});
}
