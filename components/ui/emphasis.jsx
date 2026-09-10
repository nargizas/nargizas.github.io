function normalize(text) {
  return text.replace(/\s+/g, ' ').trim();
}

export function Emphasis({ text, className }) {
  const parts = normalize(text).split(/\*\*(.+?)\*\*/g);
  return (
    <p className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  );
}
