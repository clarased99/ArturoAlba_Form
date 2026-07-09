(function () {
    "use strict";

    /* Mensajes de marca según nº de aciertos (0 a 5) */
    var MESSAGES = [
        { title: "El primer paso", text: "Todo ritual de conocimiento empieza por descubrir. Aún no conoces los secretos de Arturo Alba, pero cada fórmula tiene su ciencia y cada ciencia, su momento de aprendizaje." },
        { title: "Una gota de precisión", text: "La piel guarda más secretos de los que imaginas y Arturo Alba, la ciencia para descifrarlos." },
        { title: "El umbral del conocimiento", text: "Empiezas a intuir la lógica detrás de cada activo. Un poco más de tiempo y la fórmula se revelará por completo." },
        { title: "Afinando el instinto", text: "Tu mirada ya distingue lo esencial. Estás a medio camino entre la intuición y la maestría que exige la ciencia del rejuvenecimiento." },
        { title: "Casi maestría", text: "Conoces la fórmula casi tan bien como quien la creó. Solo un detalle te separa de dominar por completo el lenguaje de Arturo Alba." },
        { title: "Maestría absoluta", text: "Dominas la ciencia y el arte que hay detrás de cada fórmula. Tu conocimiento está a la altura de la propia filosofía Arturo Alba." }
    ];

    function readAnswer(question) {
        try {
            return sessionStorage.getItem("respuesta-" + question);
        } catch (e) {
            return null;
        }
    }

    var blocks = document.querySelectorAll(".results__question-block");
    var score = 0;

    blocks.forEach(function (block) {
        var question = block.dataset.question;
        var given = readAnswer(question);
        var options = block.querySelectorAll(".results__option");
        var isCorrectAnswer = false;

        options.forEach(function (opt) {
            var isCorrect = opt.dataset.correct === "true";
            var wasSelected = opt.dataset.value === given;

            if (isCorrect) {
                opt.classList.add("is-correct");
            }
            if (wasSelected && !isCorrect) {
                opt.classList.add("is-wrong");
            }
            if (wasSelected && isCorrect) {
                isCorrectAnswer = true;
            }
        });

        if (isCorrectAnswer) score++;
    });

    var msg = MESSAGES[score] || MESSAGES[0];

    var scoreEl = document.getElementById("scoreValue");
    var titleEl = document.getElementById("resultTitle");
    var messageEl = document.getElementById("resultMessage");

    if (scoreEl) scoreEl.textContent = score;
    if (titleEl) titleEl.textContent = msg.title;
    if (messageEl) messageEl.textContent = msg.text;
})();