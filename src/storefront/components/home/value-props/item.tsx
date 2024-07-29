import { ValueProp } from ".";

export function ValuePropItem({ title, content, icon: Icon }: ValueProp) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <Icon className="mb-3 size-9" />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
