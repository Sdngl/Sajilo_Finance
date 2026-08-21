const metrics = [
  ["10K+", "Demo users"],
  ["2.5M+", "Transactions tracked"],
  ["8K+", "Savings goals"],
  ["1.2K+", "SMEs supported"],
];
export default function Impact() {
  return (
    <section className="border-y border-[#e7eeeb] bg-white py-7">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
        {metrics.map(([v, l]) => (
          <div key={l}>
            <p className="text-2xl font-bold">{v}</p>
            <p className="mt-1 text-xs text-[#71817b]">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
