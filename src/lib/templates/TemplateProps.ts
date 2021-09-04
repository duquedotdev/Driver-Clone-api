interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface ParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}
