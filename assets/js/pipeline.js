(function () {

  const icons = {
    "Input": "📥",
    "Input text": "📥",
    "Model": "⚙️",
    "Logits": "📊",
    "Temperature": "🌡️",
    "Softmax": "🔄",
    "Probabilities": "📈",
    "Top-k / Top-p": "🎯",
    "Sampling": "🎲",
    "Argmax": "🏆",
    "Output": "📤",
    "Output token": "📤",
    "Token selection": "🎯"
  };

  const colorMap = {
    "Input": "gn-step--input",
    "Input text": "gn-step--input",
    "Model": "gn-step--model",
    "Logits": "gn-step--logits",
    "Softmax": "gn-step--softmax",
    "Temperature": "gn-step--softmax",
    "Probabilities": "gn-step--prob",
    "Top-k / Top-p": "gn-step--sampling",
    "Sampling": "gn-step--sampling",
    "Argmax": "gn-step--sampling",
    "Output": "gn-step--output",
    "Output token": "gn-step--output",
    "Token selection": "gn-step--output"
  };

  function createPipeline(container) {
    let steps = [];

    try {
      steps = JSON.parse(container.dataset.steps || "[]");
    } catch (e) {
      console.error("Invalid JSON in data-steps:", container);
      return;
    }

    const highlight = container.dataset.highlight;

    const wrapper = document.createElement("div");
    wrapper.className = "gn-pipeline";

    steps.forEach((step, index) => {

      const stepEl = document.createElement("div");
      stepEl.className = "gn-step";

      /* ✅ FIXED LOGIC */
      if (step === highlight) {
        stepEl.classList.add("gn-step--highlight");
      } else {
        const colorClass = colorMap[step];
        if (colorClass) {
          stepEl.classList.add(colorClass);
        }
      }

      const icon = icons[step] || "•";
      stepEl.innerHTML = `<span class="gn-step__icon">${icon}</span> ${step}`;

      wrapper.appendChild(stepEl);

      if (index !== steps.length - 1) {
        const arrow = document.createElement("div");
        arrow.className = "gn-arrow";
        arrow.textContent = "→";
        wrapper.appendChild(arrow);
      }
    });

    container.appendChild(wrapper);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".gn-pipeline-component")
      .forEach(createPipeline);
  });

})();