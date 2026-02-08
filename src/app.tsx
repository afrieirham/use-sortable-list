import { HandleOnlyUsage } from "./demo/handle-only-usage";
import { StandardUsage } from "./demo/standard-usage";

const LibraryDemoPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* --- NAVIGATION HEADER --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Top Left: Logo */}
          <div className="flex items-center gap-6">
            <img
              src="/logo.png"
              className="w-8 h-8"
              alt="use sortable list logo"
            />
          </div>

          {/* Top Right: Links & GitHub */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
              <a
                href="https://github.com/afrieirham/use-sortable-list#readme"
                className="hover:text-slate-900 transition-colors"
              >
                Docs
              </a>
              <a
                href="https://github.com/afrieirham/use-sortable-list/blob/main/LICENSE"
                className="hover:text-slate-900 transition-colors"
              >
                License
              </a>
            </div>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <a
              href="https://github.com/afrieirham/use-sortable-list"
              target="_blank"
              rel="noreferrer"
              className="text-slate-900 hover:text-slate-600 transition-colors"
              aria-label="GitHub Repository"
            >
              <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <title>github</title>
                <path
                  d="M56.7937 84.9688C44.4187 83.4688 35.7 74.5625 35.7 63.0313C35.7 58.3438 37.3875 53.2813 40.2 49.9063C38.9812 46.8125 39.1687 40.25 40.575 37.5313C44.325 37.0625 49.3875 39.0313 52.3875 41.75C55.95 40.625 59.7 40.0625 64.2937 40.0625C68.8875 40.0625 72.6375 40.625 76.0125 41.6563C78.9187 39.0313 84.075 37.0625 87.825 37.5313C89.1375 40.0625 89.325 46.625 88.1062 49.8125C91.1062 53.375 92.7 58.1563 92.7 63.0313C92.7 74.5625 83.9812 83.2813 71.4187 84.875C74.6062 86.9375 76.7625 91.4375 76.7625 96.5938L76.7625 106.344C76.7625 109.156 79.1062 110.75 81.9187 109.625C98.8875 103.156 112.2 86.1875 112.2 65.1875C112.2 38.6563 90.6375 17 64.1062 17C37.575 17 16.2 38.6562 16.2 65.1875C16.2 86 29.4187 103.25 47.2312 109.719C49.7625 110.656 52.2 108.969 52.2 106.438L52.2 98.9375C50.8875 99.5 49.2 99.875 47.7 99.875C41.5125 99.875 37.8562 96.5 35.2312 90.2188C34.2 87.6875 33.075 86.1875 30.9187 85.9063C29.7937 85.8125 29.4187 85.3438 29.4187 84.7813C29.4187 83.6563 31.2937 82.8125 33.1687 82.8125C35.8875 82.8125 38.2312 84.5 40.6687 87.9688C42.5437 90.6875 44.5125 91.9063 46.8562 91.9063C49.2 91.9063 50.7 91.0625 52.8562 88.9063C54.45 87.3125 55.6687 85.9063 56.7937 84.9688Z"
                  fill="black"
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>
      {/* --- HERO SECTION --- */}
      <header className="bg-white border-b border-slate-200 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            use-sortable-list
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A tiny, headless React hook for native drag-and-drop reordering. No
            dependencies. No bloat. Just works.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://github.com/afrieirham/use-sortable-list#readme"
              className="bg-black text-white px-8 py-3 cursor-pointer rounded-full font-bold hover:bg-black/80 transition-all flex items-center gap-2 shadow-lg shadow-black/20"
            >
              Read the docs
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Chevron Right Icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
            <a
              href="https://github.com/afrieirham/use-sortable-list/blob/main/src/App.tsx#L128"
              className="hover:underline"
            >
              See code example
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <StandardUsage />
          <HandleOnlyUsage />
        </div>

        {/* --- FEATURES GRID --- */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-200 pt-16">
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Zero Dependencies</h3>
            <p className="text-slate-600 text-sm">
              Built using the browser&apos;s native Drag and Drop API. No
              third-party physics engines or heavy libraries.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Headless Design</h3>
            <p className="text-slate-600 text-sm">
              You own the markup and the styles. We just provide the logic and
              event handlers to sync your state.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg">Mobile Ready</h3>
            <p className="text-slate-600 text-sm">
              Leverages Pointer Events to ensure smooth handle-based dragging on
              touch devices and tablets.
            </p>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm border-t border-slate-200 mt-12 bg-white">
        &copy; {new Date().getFullYear()} use-sortable-list. Created by{" "}
        <a href="https://afrieirham.com" className="hover:underline">
          Afrie
        </a>
        .
      </footer>
    </div>
  );
};

export default LibraryDemoPage;
