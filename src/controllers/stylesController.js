export class stylesController {
  static handleColorTheme(e, themeVariable) {
    const selectedValue = e.target.value;
    switch (selectedValue) {
      case "Light":
        document.documentElement.classList.remove("dark");
        themeVariable("Light");
        break;
      case "Dark":
        document.documentElement.classList.add("dark");
        themeVariable("Dark");
        break;
    }
  }

  static handleFontSize(e, value, fontsizeVariable) {
    const SelectedFont = e.target.value;
    switch (SelectedFont) {
        case "Small":
          fontsizeVariable("text-[15px]");
          value("Small");
          break;
        case "Medium":
        fontsizeVariable("text-[18px]");
          value("Medium");
          break;
        case "Large":
        fontsizeVariable("text-[22px]");
          value("Large");
          break;
      }
  }

  static handleDesignList (e, value, designListVariable) {
    const SelectedListStyle = e.target.value;
    switch (SelectedListStyle) {
        case "Grid":
          designListVariable("grid grid-cols-2 grid-d");
          value("Grid");
          break;
        case "List":
          designListVariable("flex flex-col w-[70%]");
          value("List");
          break;
      }
  }


}

