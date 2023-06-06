function isCharValid(charStr) {
  return !!/[1234567890]/.test(charStr);
}

function isKeyPressedNumeric(event) {
  const charStr = event.key;
  return isCharValid(charStr);
}

function isValid(value = "") {
  const dateArr = value.split("-");
  if (dateArr.length !== 3) {
    return false;
  }

  const [year, month, day] = dateArr;
  if (year !== String(+year) || year.length !== 4) return false;
  if (+month > 12 || +month === 0 || month.length !== 2) return false;
  if (+day > 31 || +day === 0 || day.length !== 2) return false;
  
  return true;
}

// Implementing ICellEditorComp
class DateEditor {
  focusAfterAttached;
  eInput;
  cancelBeforeStart;
  // gets called once before the renderer is used
  init(params) {
    // we only want to highlight this cell if it started the edit, it is possible
    // another cell in this row started the edit
    this.focusAfterAttached = params.cellStartedEdit;
    this.prevValue = params.value;

    // create the cell
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
      if (!isKeyPressedNumeric(event) || event.target.value.length >= 10) {
        this.eInput.focus();
        if (event.preventDefault) event.preventDefault();
      } else {
        if (event.target.value.length === 4 || event.target.value.length === 7) {
          this.eInput.value += '-'
        }
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

export default DateEditor;
