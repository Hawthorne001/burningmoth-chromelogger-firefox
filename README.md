# Chrome Logger Firefox WebExtension

WebExtension implementing [Chrome Logger protocol](https://craig.is/writing/chrome-logger/techspecs) for Firefox.

## String Substitutions And Styling

Console output is automatically styled from settings *unless* non-escaped [string substitutions](https://developer.mozilla.org/en-US/docs/Web/API/console#Outputting_text_to_the_console) are detected in the message being logged.

## Logging Data From DOM

To log data to the web console through this extension *after* headers have been sent, the following methods are supported.

Log the entire ChromeLoggerData object that would've otherwise been the base64-encoded header value.

	<script 
		id="chromelogger" 
		type="application/json"
	>{ ChromeLoggerData object }</script>	

Or just log the `rows` array of the ChromeLoggerData object. Attributes `data-chromelogger-version` and `data-chromelogger-columns` are optional and default to the values shown if missing.

	<script 
		id="chromelogger" 
		type="application/json" 
		data-chromelogger-version="2.0" 
		data-chromelogger-columns="log,backtrace,type"
	>[ ChromeLoggerData.rows array ]</script>

`<script>` values must be valid JSON or error is thrown.

## Using ChromeLogger DevTools Panel

A ChromeLogger `devtools.panel` is provided to display ChromeLoggerData messages when open or that Firefox fails to log to the web console -- in which case a notice is displayed to prompt the user to open the ChromeLogger panel.

In addition to supporting standard `console` methods, passing a valid XML string with `dir` or `dirxml` methods will attempt to display an interactive tree -- which is not yet a feature of Firefox's web console as of this writing.