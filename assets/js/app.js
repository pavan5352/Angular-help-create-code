const modalTriggers = document.querySelectorAll("[data-modal-target]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const confirmOverlay = document.querySelector(".confirm-overlay");
const successOverlay = document.querySelector(".success-overlay");

const stepButtons = document.querySelectorAll("[data-step]");
const stepPanels = document.querySelectorAll(".step-panel");
const stepIndicators = document.querySelectorAll(".step");
const previousButton = document.querySelector("[data-role=\"prev\"]");
const nextButton = document.querySelector("[data-role=\"next\"]");
const submitButton = document.querySelector("[data-role=\"submit\"]");

const addRowButton = document.querySelector("[data-add-row]");
const configTableBody = document.querySelector("[data-config-body]");

const submitTrigger = document.querySelector("[data-submit]");
const confirmProceed = document.querySelector("[data-confirm-proceed]");

const toggleButtons = document.querySelectorAll("[data-toggle-group] button");

function openModal() {
  if (overlay) {
    overlay.classList.add("active");
    showStep("1");
  }
}

function closeModal() {
  overlay?.classList.remove("active");
}

function showStep(step) {
  stepPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.step === step);
  });

  stepIndicators.forEach((indicator) => {
    indicator.classList.toggle("active", indicator.dataset.step === step);
  });

  if (previousButton && nextButton && submitButton) {
    const isFirst = step === "1";
    previousButton.style.display = isFirst ? "none" : "inline-flex";
    nextButton.style.display = isFirst ? "inline-flex" : "none";
    submitButton.style.display = isFirst ? "none" : "inline-flex";
  }
}

function openConfirm() {
  confirmOverlay?.classList.add("active");
}

function closeConfirm() {
  confirmOverlay?.classList.remove("active");
}

function openSuccess() {
  successOverlay?.classList.add("active");
}

function closeSuccess() {
  successOverlay?.classList.remove("active");
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openModal);
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal();
    closeConfirm();
    closeSuccess();
  });
});

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showStep(button.dataset.step);
  });
});

addRowButton?.addEventListener("click", () => {
  if (!configTableBody) return;
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" placeholder="Table name" /></td>
    <td><input type="text" placeholder="Attribute" /></td>
    <td>
      <select>
        <option>String</option>
        <option>Number</option>
        <option>Date</option>
      </select>
    </td>
    <td>
      <select>
        <option>Count</option>
        <option>Max</option>
        <option>Min</option>
      </select>
    </td>
    <td>
      <select>
        <option>Select Conditions</option>
        <option>Equals</option>
        <option>Not Null</option>
      </select>
    </td>
    <td><input type="text" placeholder="Enter value" /></td>
  `;
  configTableBody.appendChild(row);
});

submitTrigger?.addEventListener("click", openConfirm);

confirmProceed?.addEventListener("click", () => {
  closeConfirm();
  closeModal();
  openSuccess();
});

toggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest("[data-toggle-group]");
    group?.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeConfirm();
    closeSuccess();
  }
});
