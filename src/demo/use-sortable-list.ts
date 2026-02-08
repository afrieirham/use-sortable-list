import { useRef, useState } from "react";

export function useSortableList<T>(
  items: T[],
  onReorder: (newItems: T[]) => void,
) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const isHandleAction = useRef(false);
  const hasHandleRegistered = useRef(false);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    // If handles are used but the drag started elsewhere, cancel the drag
    if (hasHandleRegistered.current && !isHandleAction.current) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
  };

  const handleDragEnter = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newList = [...items];
    const draggedItem = newList[draggedIndex];

    newList.splice(draggedIndex, 1);
    newList.splice(targetIndex, 0, draggedItem);

    setDraggedIndex(targetIndex);
    onReorder(newList);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    isHandleAction.current = false;
  };

  const getItemProps = (index: number) => ({
    draggable: true,
    onDragStart: (e: React.DragEvent) => handleDragStart(e, index),
    onDragEnter: () => handleDragEnter(index),
    onDragEnd: handleDragEnd,
    onDragOver: (e: React.DragEvent) => e.preventDefault(),
    // Reset handle state if user clicks directly on the item (not the handle)
    onPointerDown: () => {
      isHandleAction.current = false;
    },
    isDragging: draggedIndex === index,
  });

  const getHandleProps = () => {
    hasHandleRegistered.current = true;

    return {
      onPointerDown: (e: React.PointerEvent) => {
        // CRITICAL: Stop the event from bubbling up to getItemProps
        // which would reset isHandleAction to false
        e.stopPropagation();
        isHandleAction.current = true;
      },
      style: {
        userSelect: "none" as const,
        touchAction: "none" as const,
        cursor: "grab",
      },
    };
  };

  return {
    getItemProps,
    getHandleProps,
    draggedIndex,
  };
}
