export default {
  data() {
    return {
      // to check numbers ans fractional numbers
      arrowsKeyCodes: [37, 38, 39, 40],
      numPadNumberKeyCodes: [96, 97, 98, 99, 100, 101, 102, 103, 104, 105],
      dots: [110, 190],
      tabBackDel: [8, 9, 46],
      acv: [65, 67, 86],
      // to check numbers ans fractional numbers
    };
  },
  methods: {
    blurEvent(e) {
      var value = e.target.value;
      if (value.substring(value.length - 1) === ".")
        e.target.value = value.substring(0, value.length - 1);
    },

    isNumber(e) {
      // Allow only one dot.
      if (
        e.target.value.indexOf(".") !== -1 &&
        this.dots.indexOf(e.keyCode) !== -1
      ) {
        e.preventDefault();
      }

      // allow only [0-9] number, numpad number, arrow,  BackSpace, Tab, Del
      // Ctrl + C, Ctrl + V, Ctrl + A
      if (
        ((e.keyCode < 48 && this.arrowsKeyCodes.indexOf(e.keyCode) === -1) ||
          (e.keyCode > 57 &&
            this.numPadNumberKeyCodes.indexOf(e.keyCode) === -1 &&
            this.dots.indexOf(e.keyCode) === -1)) &&
        this.tabBackDel.indexOf(e.keyCode) === -1 &&
        (e.ctrlKey === false ||
          (e.ctrlKey === true && this.acv.indexOf(e.keyCode) === -1))
      ) {
        e.preventDefault();
      }
    },
  },
};
