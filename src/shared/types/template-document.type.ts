export type TemplateDocument = {
  texts: TextOptionsType[];
  options?: ParagraphOptionsType;
};

export type TextOptionsType = {
  img?:string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
};

export type ParagraphOptionsType = {
  spacingAfter?: number;
  align?: AlignmentType;
};

export declare enum AlignmentType {
  START = "start",
  CENTER = "center",
  END = "end",
  BOTH = "both",
  MEDIUM_KASHIDA = "mediumKashida",
  DISTRIBUTE = "distribute",
  NUM_TAB = "numTab",
  HIGH_KASHIDA = "highKashida",
  LOW_KASHIDA = "lowKashida",
  THAI_DISTRIBUTE = "thaiDistribute",
  LEFT = "left",
  RIGHT = "right",
  JUSTIFIED = "both",
}
