export default function StatCard({ label, value, icon: Icon, color = "primary" }) {
  const colors = {
    primary: "bg-primary-50 text-primary-700",
    accent: "bg-violet-50 text-violet-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="card flex items-center gap-4">
      {Icon && (
        <div className={`rounded-xl p-3 ${colors[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      )}
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
