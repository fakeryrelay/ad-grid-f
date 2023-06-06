function isCharValid(charStr) {
  return !!/\d/.test(charStr);
}

function isKeyPressedNumeric(event) {
  const charStr = event.key;
  return isCharValid(charStr);
}

function isValid(value) {
  return value === String(+value);
}

class IntegerEditor {
  focusAfterAttached;
  eInput;
  cancelBeforeStart;

  init(params) {
    this.focusAfterAttached = params.cellStartedEdit;
    this.prevValue = params.value;

    this.eInput = document.createElement("input");
    this.eInput.classList.add("ag-input-field-input");
    this.eInput.setAttribute("required", "");
    this.eInput.style.width = "100%";
    this.eInput.style.height = "100%";
    this.eInput.style.color = "inherit";
    this.eInput.value =
      params.charPress && isCharValid(params.charPress)
        ? params.charPress
        : params.value;

    this.eInput.addEventListener("keypress", (event) => {
      if (!isKeyPressedNumeric(event)) {
        this.eInput.focus();
        if (event.preventDefault) event.preventDefault();
      } else {
        this.eInput.style.color = isValid(event.target.value + event.key)
          ? "inherit"
          : "red";
      }
    });
  }

  getGui() {
    return this.eInput;
  }

  afterGuiAttached() {
    if (this.focusAfterAttached) {
      this.eInput.focus();
      this.eInput.select();
    }
  }

  isCancelBeforeStart() {
    return this.cancelBeforeStart;
  }

  isCancelAfterEnd() {
    return false;
  }

  getValue() {
    if (isValid(this.eInput.value)) {
      return this.eInput.value;
    }
    return this.prevValue
  }

  focusIn() {
    const eInput = this.getGui();
    eInput.focus();
    eInput.select();
  }

  focusOut() {
    const eInput = this.getGui();
    if (this.eInput.value.length === 0 || !isValid(this.eInput.value)) {
      eInput.value = this.prevValue;
      eInput.style.color = 'inherit'
    }
    eInput.focus();
    eInput.select();
  }
}

export default IntegerEditor;
