import { useState } from "react";
import { useSortableList } from "./use-sortable-list";

// --- Mock Data ---
interface Task {
  id: string;
  title: string;
  category: string;
}

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Complete documentation", category: "Dev" },
  { id: "2", title: "Review pull requests", category: "Dev" },
  { id: "3", title: "Update dependencies", category: "Maintenance" },
  { id: "4", title: "Lunch with team", category: "Social" },
];

const INITIAL_FILES: Task[] = [
  { id: "f1", title: "system_architecture.pdf", category: "PDF" },
  { id: "f2", title: "production_logs.txt", category: "Text" },
  { id: "f3", title: "branding_assets.zip", category: "Archive" },
];

const LibraryDemoPage = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [files, setFiles] = useState(INITIAL_FILES);

  // Hook for "Drag Anywhere"
  const { getItemProps: getTaskProps } = useSortableList(tasks, setTasks);

  // Hook for "Drag Handle"
  const { getItemProps: getFileProps, getHandleProps: getFileHandleProps } =
    useSortableList(files, setFiles);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
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
            <button
              type="button"
              className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
              onClick={() => window.alert("Documentation scroll logic here")}
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
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* --- EXAMPLE 1: DRAG ANYWHERE --- */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Standard Usage</h2>
              <p className="text-slate-500 italic text-sm">
                Drag anywhere on the item to reorder.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <ol className="space-y-3">
                {tasks.map((task, index) => {
                  const { isDragging, ...props } = getTaskProps(index);
                  return (
                    <li
                      key={task.id}
                      {...props}
                      className={`
                        group flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-move select-none
                        ${
                          isDragging
                            ? "opacity-30 border-dashed border-blue-500 bg-blue-50"
                            : "border-slate-100 bg-slate-50 hover:border-blue-200 hover:shadow-md"
                        }
                      `}
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {task.title}
                        </p>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                          {task.category}
                        </span>
                      </div>
                      <div className="text-slate-300 group-hover:text-blue-400 transition-colors">
                        <DragIcon />
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* --- EXAMPLE 2: DRAG HANDLE --- */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Handle-Only Usage</h2>
              <p className="text-slate-500 italic text-sm">
                Dragging is restricted to the handle. Content remains
                selectable.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <ol className="space-y-3">
                {files.map((file, index) => {
                  const { isDragging, ...props } = getFileProps(index);
                  return (
                    <li
                      key={file.id}
                      {...props}
                      className={`
                        flex items-center gap-4 p-4 rounded-xl border-2 transition-all bg-white
                        ${
                          isDragging
                            ? "opacity-30 border-dashed border-emerald-500 bg-emerald-50"
                            : "border-slate-100 hover:border-slate-200"
                        }
                      `}
                    >
                      {/* Handle Icon */}
                      <button
                        {...getFileHandleProps()}
                        className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors cursor-grab active:cursor-grabbing"
                        aria-label="Drag handle"
                      >
                        <HandleIcon />
                      </button>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">
                          {file.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          Modified 2h ago
                        </p>
                      </div>

                      <button
                        type="button"
                        className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
                      >
                        DELETE
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
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

// --- SVG Icons ---

const DragIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <title>DragIcon</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
    />
  </svg>
);

const HandleIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <title>HandleIcon</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M4 8h16M4 16h16"
    />
  </svg>
);

export default LibraryDemoPage;
