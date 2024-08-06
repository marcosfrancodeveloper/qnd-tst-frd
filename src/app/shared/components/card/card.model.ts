export interface ICardContent {
  label: string;
  value: string;
}

export interface ICardLink {
  text: string;
  url: string;
}

export interface ICardData {
  icon: string;
  title: string;
  content: ICardContent[];
  link: ICardLink;
}
