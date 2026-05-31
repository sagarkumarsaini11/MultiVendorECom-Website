export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} ShopVerse — Multi-Vendor E-Commerce Platform</p>
        <p className="mt-1 text-xs">Technical Assessment Project | MERN Stack</p>
      </div>
    </footer>
  );
}
