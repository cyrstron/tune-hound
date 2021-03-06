declare module '*.scss' {
  const content: { [className: string]: string };
  export const className: string;
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export const className: string;
  export default content;
}
declare module '*.svg' {
  const content: string;
  export default content;
}
