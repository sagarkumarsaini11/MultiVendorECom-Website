export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h3 className="text-lg font-semibold text-slate-800">
          ShopVerse
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Your Multi-Vendor Shopping Destination
        </p>
        <p className="mt-4 text-xs text-slate-400">
          © {new Date().getFullYear()} ShopVerse. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}