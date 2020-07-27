let _log = window.console.log;
window.console.log = process.env.NODE_ENV === "development" ? _log : function () {
}