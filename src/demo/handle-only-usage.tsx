import { useState } from "react";
import { useSortableList } from "./use-sortable-list";

interface File {
  id: string;
  title: string;
  category: string;
}

const INITIAL_FILES: File[] = [
  { id: "f1", title: "system_architecture.pdf", category: "PDF" },
  { id: "f2", title: "production_logs.txt", category: "Text" },
  { id: "f3", title: "branding_assets.zip", category: "Archive" },
];

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

export const HandleOnlyUsage = () => {
  const [files, setFiles] = useState(INITIAL_FILES);
  const { getItemProps, getHandleProps } = useSortableList(files, setFiles);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Handle-Only Usage</h2>
        <p className="text-slate-500 italic text-sm">
          Dragging is restricted to the handle. Content remains selectable.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <ol className="space-y-3">
          {files.map((file, index) => {
            const { isDragging, ...props } = getItemProps(index);
            return (
              <li
                key={file.id}
                {...props}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 transition-all bg-white duration-200 ease-in-out
                  ${
                    isDragging
                      ? "opacity-30 border-dashed border-emerald-500 bg-emerald-50"
                      : "border-slate-100 hover:border-slate-200"
                  }
                `}
              >
                {/* Handle Icon */}
                <button
                  {...getHandleProps(index)}
                  className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors cursor-grab active:cursor-grabbing"
                  aria-label="Drag handle"
                >
                  <HandleIcon />
                </button>

                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">
                    {file.title}
                  </p>
                  <p className="text-xs text-slate-400">Modified 2h ago</p>
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
  );
};
