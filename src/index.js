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

// import our stylesheets
// import './styles.css';

// import the components we'll use in this page
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/styles/all-medium-light.css";
import "@spectrum-web-components/textfield/sp-textfield.js";
import "@spectrum-web-components/divider/sp-divider.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/toast/sp-toast.js";
import "@spectrum-web-components/styles/typography.css";
import * as importUtils from "./importUtils.js";

window.setupEventListeners = (AddOnSdk) => {
	//It denotes initial value of parameters
	let initialState = {
		urls: [],
		valueMimeType: "application/pdf",
		rangeValue: "currentPage",
		mimeTypeValue: "",
	};

	document
		.getElementById("prompt-input")
		.addEventListener("input", importUtils.updateFields);

	document
		.getElementById("prompt-input")
		.addEventListener("keypress", (event) => {
			if (event.key == "Enter") {
				event.preventDefault();
				document.getElementById("generate-button").click();
			}
		});

	document
		.getElementById("generate-button")
		.addEventListener("click", function (event) {
			importUtils.addImportedImage(event, AddOnSdk);
		});
};
