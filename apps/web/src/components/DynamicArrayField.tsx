type Props = {
  label: string;
  values: string[];
  suggestions: string[];
  onChange: (values: string[]) => void;
};

export function DynamicArrayField({ label, values, suggestions, onChange }: Props) {
  const add = (value: string) => {
    if (!value || values.includes(value)) return;
    onChange([...values, value]);
  };
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-medium text-slate-900">{label}</label>
        <span className="text-xs text-slate-500">{values.length} selected</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button key={item} type="button" onClick={() => add(item)}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
            + {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => (
          <button key={item} type="button" onClick={() => onChange(values.filter(v => v !== item))}
            className="rounded-full bg-slate-900 px-3 py-2 text-sm text-white">
            {item} ×
          </button>
        ))}
      </div>
    </section>
  );
}
