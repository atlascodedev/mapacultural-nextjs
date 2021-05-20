import { ColorThemeOptions, ColorThemeOptionsVariants } from "../../@types";

const getThemeColor = (
  color: ColorThemeOptions,
  variant?: ColorThemeOptionsVariants
) => {
  if (variant) {
    return `${color}-${variant}`;
  } else {
    return `${color}-main`;
  }
};

export default getThemeColor;
