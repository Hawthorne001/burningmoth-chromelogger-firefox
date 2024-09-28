"use strict";
/**
 * Options page scripts.
 * @since 1.5
 */


/**
 * Populate form from options.
 * @param object opts
 */
function populateForm( opts ) {

	// populate substitution styles ...
	Object.entries(opts.console_substitution_styles).forEach(([ key, value ])=>{
		let input = document.querySelector( 'input#console_substitution_styles-'.concat(key) );
		if ( input ) {
			input.value = value;
			input.dispatchEvent(new Event('keyup')); // trigger change event to update label
		}
	});

	// misc. settings ...
	document.querySelector('input#display_data_url').checked = opts.display_data_url;

}


document.addEventListener("DOMContentLoaded", event=>{

	// style inputs ...
	let console_substitution_style_inputs = document.querySelectorAll("form fieldset#console_substitution_styles input");

	// update label style on input update ...
	console_substitution_style_inputs.forEach(input=>{
		input.addEventListener("keyup", event=>{
			event.target.previousElementSibling.style = event.target.value;
		});
	});

	// populate form from options ...
	browser.storage.sync.get(DEFAULT_OPTIONS)
	.then(populateForm)
	.catch(error=>console.error(error));

	// onsubmit ...
	document.querySelector("form").addEventListener("submit", event=>{

		event.preventDefault();

		// reset ...
		if ( event.submitter.id == 'reset' ) {

			// set from default options ? update form from default options ...
			browser.storage.sync.set(DEFAULT_OPTIONS)
			.then(()=>{
				populateForm(DEFAULT_OPTIONS);
				alert('Settings have been reset!');
			})
			.catch(error=>console.error(error));

		}

		// save ...
		else {

			// styles collection ...
			let console_substitution_styles = {};

			// update collection ...
			console_substitution_style_inputs.forEach(input=>{
				console_substitution_styles[ input.id.substring( input.id.indexOf('-') + 1 ) ] = input.value;
			});

			// save settings ...
			browser.storage.sync.set({

				// styles ...
				console_substitution_styles: console_substitution_styles,

				// display url ...
				display_data_url: document.querySelector("form input#display_data_url").checked,

			})
			.then(()=>{ alert('Settings saved!'); })
			.catch(error=>console.error(error));

		}

	});


});

