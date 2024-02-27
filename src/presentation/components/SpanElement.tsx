interface Props {
  className: string;
  text: string;
}
export const SpanElement = ({ className, text }: Props) => {
  return <span className={className}>{text}</span>;
};
