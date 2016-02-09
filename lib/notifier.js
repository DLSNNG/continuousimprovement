Notifier = {
	addSuccess: addSuccess,
	addError: addError
}

function addSuccess(message, duration) {
	var note = new Models.Notification({ message: message, className: "success", duration: duration });
		note.save();
}

function addError(message, duration) {
	var note = new Models.Notification({ message: message, className: "error", duration: duration });
		note.save();
}