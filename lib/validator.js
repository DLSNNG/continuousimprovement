Validator = validator;
Models.Status = status;

function validator() {
	var validator = {
		status: new Models.Status(),
		checkString: checkString,
		checkDate: checkDate
	}

	function checkString(val, errorText) {
		if (!isString(val)) {
			failValidation.call(this, errorText);
		}
	}

	function checkDate(val, errorText) {
		if (!isDate(val)) {
			failValidation.call(this, errorText);
		}
	}

	function failValidation(errorText) {
		this.status.passes = false;
		this.status.error = errorText;
	}

	function isString(val) {
		var isString = true;
		if (typeof val != 'string') { isString = false; }
		if (val.trim().length === 0) {	isString = false; }
		return isString;
	}

	function isDate (val) {
		return moment(val);
	}

	return validator;
}

function status() {
	var status = {
		passes: true,
		error: null
	}
	return status;
}