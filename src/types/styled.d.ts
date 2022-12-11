// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: IThemeColor;
    fonts: IThemeFont;
    typography: IThemeTypography;
    device: IThemeDevice;
    shadows: IBaseShadows;
    zIndex: IThemeZIndex;
  }

  export interface IThemeColor {
    Primary1: string;
    Primary2: string;
    Primary3: string;
    Primary4: string;
    Primary5: string;
    Primary6: string;
    Secondary1: string;
    Secondary2: string;
    Secondary3: string;
    Secondary4: string;
    Secondary5: string;
    Secondary6: string;
    Neutral0: string;
    Neutral1: string;
    Neutral2: string;
    Neutral3: string;
    Neutral4: string;
    Neutral5: string;
    Neutral6: string;
    Neutral7: string;
    Neutral8: string;
    Neutral9: string;
    Success1: string;
    Success2: string;
    Success3: string;
    Success4: string;
    Success5: string;
    Success6: string;
    Warning1: string;
    Warning2: string;
    Warning3: string;
    Warning4: string;
    Warning5: string;
    Warning6: string;
    Danger1: string;
    Danger2: string;
    Danger3: string;
    Danger4: string;
    Danger5: string;
    Danger6: string;
    TransparentLight: string;
    TransparentDark: string;
  }

  export interface IThemeFont {
    dmSans: string;
    robotoMono: string;
  }

  export interface IThemeTypography {
    title: ITitle;
    body: IBody;
    numbers: INumbers;
  }

  interface ITitle {
    xxl: IXxl;
    xl: IXl;
    l: IL;
    m: IM;
    s: IS;
  }

  interface IXxl {
    bold: IBold;
    regular: IRegular;
  }

  interface IBold {
    fontSize: number;
    textDecoration: string;
    fontFamily: string;
    fontWeight: number;
    fontStyle: string;
    fontStretch: string;
    letterSpacing: number;
    lineHeight: number;
    paragraphIndent: number;
    paragraphSpacing: number;
    textCase: string;
  }

  interface IRegular {
    fontSize: number;
    textDecoration: string;
    fontFamily: string;
    fontWeight: number;
    fontStyle: string;
    fontStretch: string;
    letterSpacing: number;
    lineHeight: number;
    paragraphIndent: number;
    paragraphSpacing: number;
    textCase: string;
  }

  interface IXl {
    regular: IRegular;
    bold: IBold;
  }

  interface IL {
    regular: IRegular;
    bold: IBold;
  }

  interface IM {
    regular: IRegular;
    bold: IBold;
  }

  interface IS {
    bold: IBold;
    regular: IRegular;
  }

  interface IBody {
    l: IL;
    m: IM;
    s: IS;
    xs: IXs;
  }

  interface IXs {
    regular: IRegular;
    bold: IBold;
  }

  interface INumbers {
    xl: IXl;
    l: IL;
    m: IM;
    s: IS;
    xs: IXs;
  }

  interface IThemeDevice {
    mobile: string;
    tabletS: string;
    tabletL: string;
    desktopS: string;
    desktopL: string;
  }

  interface IBaseShadows {
    elevationLow: string;
    elevationMedium: string;
    elevationHigh: string;
  }
}

interface IThemeZIndex {
  dropdown: number;
  checkoutCellImage: number;
  modal: number;
  overlayDrawer: number;
  drawer: number;
}

interface IThemeDevice {
  mobile: string;
  tabletS: string;
  tabletL: string;
  desktopS: string;
  desktopL: string;
}
