import { useState } from "react";
import { useSortableList } from "./use-sortable-list";

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

export const StandardUsage = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const { getItemProps } = useSortableList(tasks, setTasks);

  return (
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
            const { isDragging, ...props } = getItemProps(index);
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
                  <p className="font-semibold text-slate-800">{task.title}</p>
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
  );
};
