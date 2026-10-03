(function () {

    const base = document.createElement("base");

    base.href = "/lyratech_frontend/";

    document.head.prepend(base);

    window.history.replaceState(null, "", "/");

})();