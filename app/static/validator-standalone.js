/* File taken from:
 * https://github.com/LukePeters/formvalidatorjs/blob/61ea0d83fa16876e30f93d97881a5e7066287eb2/validator-standalone.js
 */
(function(window) {
  function validator() {

    var _validator = {},
        settings = {
          errored_input_classname: "errored",
          error_text_classname: "input-error",
          error_text_data_attribute: "data-error-text"
        };

    _validator.checkForm = function(form, settings_override) {
      
      if(settings_override) {
        settings = Object.assign(settings, settings_override);
      }
      
      this.resetForm(form);

      var errorsFound = false,
          requiredInputs = form.querySelectorAll("input[required], textarea[required], select[required]"),
          re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      for (var i = 0; i < requiredInputs.length; i++) {

        var input = requiredInputs[i],
          val = input.value;

        if (!val) {
          this.createError(input);
          errorsFound = true;
        } else if (input.type === "email" && re.test(val) === false) {
          this.createError(input);
          errorsFound = true;
        }
      }

      if (errorsFound) {
        return false;
      }

      return true;
    };

    _validator.createError = function(input) {
      var errorMessage = input.getAttribute(settings.error_text_data_attribute),
          errorMessageNode = document.createElement("span");

      input.classList.add(settings.errored_input_classname);
      errorMessageNode.classList.add(settings.error_text_classname);
      errorMessageNode.innerText = errorMessage;

      // Insert error message directly after the input element
      input.parentNode.insertBefore(errorMessageNode, input.nextSibling);
    };

    _validator.resetForm = function(form) {
      var erroredInputs = form.querySelectorAll("." + settings.errored_input_classname),
          errorMessageNodes = form.querySelectorAll("." + settings.error_text_classname);

      for (var j = 0; j < erroredInputs.length; j++) {
        var input = erroredInputs[j];
        input.classList.remove(settings.errored_input_classname);
      }

      for (var k = 0; k < errorMessageNodes.length; k++) {
        var errorMessageNode = errorMessageNodes[k];
        errorMessageNode.parentNode.removeChild(errorMessageNode);
      }

    };

    return _validator;
  }

  if (typeof (window.validator) === 'undefined') {
    window.validator = validator();
  }

})(window);
