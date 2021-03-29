// we create a style tag containing the CSS specific to our component
// cloning content from a <template> tag is faster than using .innerHTML() on the main element
const template = document.createElement("template");
template.innerHTML = `
<style>
	/*:host references the shadowRoot of our custom element*/
	:host > button{
		background:#444857;
		color:white;
		font-size:1rem;
		padding: 10px 16px;
		line-height:1.2;
		border-radius:4px;
		border:3px solid transparent;
		text-align:center;
		user-select:none;
		display:inline-block;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:host > button:hover{
		cursor:pointer;
		background: #5a6074;
	}
</style>
`;

//the first half of the bare minimum is to create a class representing our element
//which inerhit from the HTMLElement class
class CustomButton extends HTMLElement {
	//you have to specify a constructor method
	constructor() {
		//you have to call the super() function which calls the contructor of the parent
		super();

		//to our customElement referenced by the keyword "this" we attach a shadowRoot
		//a shadow root is a scoped space which means that what's defined in there isn't definde outside
		//also, interestingly, the outside CSS dosen't affect the CSS inside our shadow root
		this.attachShadow({ mode: "open" });

		//here we inject a copy of the <style> tag present at the top of our file
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		//we'll create a <button> tag and we'll attach it in our shadow root
		const container = document.createElement("button");
		this.shadowRoot.appendChild(container);

		//inside the button we just add we put a special <slot> element
		//it will contain what's between the <custom-button></custom-button>
		const content = document.createElement("slot");
		container.appendChild(content);
	}
}

//the second half of the bare minimum is to add the definition of our element to the custom elements known by the browser
window.customElements.define("custom-button", CustomButton);
