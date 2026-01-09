const modalTriggers = document.querySelectorAll("[data-modal-target]");
const editTriggers = document.querySelectorAll("[data-edit-target]");
const deleteTriggers = document.querySelectorAll("[data-delete-target]");
const previewTriggers = document.querySelectorAll("[data-preview-target]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const overlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");
const editOverlay = document.querySelector(".edit-overlay");
const deleteOverlay = document.querySelector(".delete-overlay");
const rejectOverlay = document.querySelector(".reject-overlay");
const confirmOverlay = document.querySelector(".confirm-overlay");
const successOverlay = document.querySelector(".success-overlay");
const statusPopovers = document.querySelectorAll("[data-status-popover]");
const statusButtons = document.querySelectorAll("[data-status-button]");
const auditTabs = document.querySelectorAll("[data-tab-target]");
const auditPanels = document.querySelectorAll("[data-tab-panel]");
const listTabs = document.querySelectorAll("[data-list-tab]");
const listPanels = document.querySelectorAll("[data-list-panel]");
const rowToggles = document.querySelectorAll("[data-row-toggle]");
const approveButtons = document.querySelectorAll("[data-approve]");
const rejectButtons = document.querySelectorAll("[data-reject]");

const stepButtons = document.querySelectorAll("[data-step]");
const stepPanels = document.querySelectorAll(".step-panel");
const stepIndicators = document.querySelectorAll(".step");
const previousButtons = document.querySelectorAll("[data-role=\"prev\"]");
const nextButtons = document.querySelectorAll("[data-role=\"next\"]");
const submitButtons = document.querySelectorAll("[data-role=\"submit\"]");

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

function openEditModal() {
  editOverlay?.classList.add("active");
  showStep("1");
}

function closeEditModal() {
  editOverlay?.classList.remove("active");
}

function openDeleteModal() {
  deleteOverlay?.classList.add("active");
}

function closeDeleteModal() {
  deleteOverlay?.classList.remove("active");
}

function openRejectModal() {
  rejectOverlay?.classList.add("active");
}

function closeRejectModal() {
  rejectOverlay?.classList.remove("active");
}

function showStep(step) {
  stepPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.step === step);
  });

  stepIndicators.forEach((indicator) => {
    indicator.classList.toggle("active", indicator.dataset.step === step);
  });

  const isFirst = step === "1";
  previousButtons.forEach((button) => {
    button.style.display = isFirst ? "none" : "inline-flex";
  });
  nextButtons.forEach((button) => {
    button.style.display = isFirst ? "inline-flex" : "none";
  });
  submitButtons.forEach((button) => {
    button.style.display = isFirst ? "none" : "inline-flex";
  });
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

editTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openEditModal);
});

deleteTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openDeleteModal);
});

previewTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    window.location.href = "preview-request.html";
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal();
    closeEditModal();
    closeDeleteModal();
    closeConfirm();
    closeSuccess();
    closeRejectModal();
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

statusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.statusButton;
    statusPopovers.forEach((popover) => {
      popover.classList.toggle("active", popover.dataset.statusPopover === targetId);
    });
  });
});

document.addEventListener("click", (event) => {
  const isStatusButton = event.target.closest("[data-status-button]");
  const isPopover = event.target.closest("[data-status-popover]");
  if (!isStatusButton && !isPopover) {
    statusPopovers.forEach((popover) => popover.classList.remove("active"));
  }
});

auditTabs.forEach((button) => {
  button.addEventListener("click", () => {
    auditTabs.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    auditPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.tabPanel === button.dataset.tabTarget);
    });
  });
});

listTabs.forEach((button) => {
  button.addEventListener("click", () => {
    listTabs.forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    listPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.listPanel === button.dataset.listTab);
    });
  });
});

rowToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(`[data-row-panel=\"${button.dataset.rowToggle}\"]`);
    if (!target) return;
    target.classList.toggle("active");
  });
});

approveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.textContent = "Approved";
  });
});

rejectButtons.forEach((button) => {
  button.addEventListener("click", openRejectModal);
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
    closeEditModal();
    closeDeleteModal();
    closeConfirm();
    closeSuccess();
    closeRejectModal();
  }
});
