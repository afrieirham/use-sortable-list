import { useCallback, useEffect, useRef, useState } from "react";

export function useSortableList<T>(
  items: T[],
  onReorder: (newItems: T[]) => void,
) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const hasHandleRegistered = useRef(false);
  const isHandleAction = useRef(false);

  // Refs for custom pointer logic (Mobile)
  const itemsRef = useRef(items);
  const draggedIndexRef = useRef<number | null>(null);
  const lastUpdate = useRef<number>(0);

  // 1. Detect device type on mount
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // 2. Sync refs for mobile logic
  useEffect(() => {
    itemsRef.current = items;
    draggedIndexRef.current = draggedIndex;
  }, [items, draggedIndex]);

  // --- MOBILE LOGIC (Pointer Events + Manual Collision) ---
  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const sourceIndex = draggedIndexRef.current;
      if (sourceIndex === null) return;

      const now = Date.now();
      if (now - lastUpdate.current < 100) return; // Throttle jitter

      const element = document.elementFromPoint(e.clientX, e.clientY);
      const targetItem = element?.closest("[data-sortable-index]");

      if (targetItem) {
        const targetIndex = Number(
          (targetItem as HTMLElement).dataset.sortableIndex,
        );
        if (targetIndex !== sourceIndex) {
          lastUpdate.current = now;
          const newList = [...itemsRef.current];
          const [draggedItem] = newList.splice(sourceIndex, 1);
          newList.splice(targetIndex, 0, draggedItem);
          setDraggedIndex(targetIndex);
          onReorder(newList);
        }
      }
    },
    [onReorder],
  );

  const onPointerUp = useCallback(() => {
    setDraggedIndex(null);
    isHandleAction.current = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }, [onPointerMove]);

  const startCustomDrag = (index: number) => {
    setDraggedIndex(index);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // --- DESKTOP LOGIC (Native HTML5 Drag & Drop) ---
  const onNativeDragStart = (e: React.DragEvent, index: number) => {
    if (hasHandleRegistered.current && !isHandleAction.current) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
  };

  const onNativeDragEnter = (targetIndex: number) => {
    const sourceIndex = draggedIndexRef.current;
    if (sourceIndex === null || sourceIndex === targetIndex) return;

    const newList = [...itemsRef.current];
    const [draggedItem] = newList.splice(sourceIndex, 1);
    newList.splice(targetIndex, 0, draggedItem);
    setDraggedIndex(targetIndex);
    onReorder(newList);
  };

  const onNativeDragEnd = () => {
    setDraggedIndex(null);
    isHandleAction.current = false;
  };

  // --- PUBLIC API ---
  const getItemProps = (index: number) => {
    const commonProps = {
      "data-sortable-index": index,
      isDragging: draggedIndex === index,
    };

    if (isTouch) {
      return {
        ...commonProps,
        onPointerDown: () => {
          if (!hasHandleRegistered.current) startCustomDrag(index);
        },
        style: {
          touchAction: "none" as const,
          userSelect: "none" as const,
          pointerEvents: (draggedIndex === index
            ? "none"
            : "auto") as React.CSSProperties["pointerEvents"],
        },
      };
    }

    return {
      ...commonProps,
      draggable: true,
      onDragStart: (e: React.DragEvent) => onNativeDragStart(e, index),
      onDragEnter: () => onNativeDragEnter(index),
      onDragEnd: onNativeDragEnd,
      onDragOver: (e: React.DragEvent) => e.preventDefault(),
      onPointerDown: () => {
        isHandleAction.current = false;
      },
    };
  };

  const getHandleProps = (index: number) => {
    hasHandleRegistered.current = true;
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.stopPropagation();
        isHandleAction.current = true;
        if (isTouch) startCustomDrag(index);
      },
      style: { cursor: "grab", touchAction: "none" as const },
    };
  };

  return { getItemProps, getHandleProps, isDragging: draggedIndex !== null };
}
