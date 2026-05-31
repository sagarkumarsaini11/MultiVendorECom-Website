import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, type = "vendor", title, subtitle }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <Sidebar type={type} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
