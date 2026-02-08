# use-sortable-list

A lightweight, library-free, headless React hook for reordering lists using the native HTML5 Drag and Drop API. No dependencies, full type safety, and automatic support for both "drag anywhere" and "drag handle" patterns.

---

## 1. Installation

Create a file named `use-sortable-list.ts` (or `.tsx`) in your project and paste the following code:

```tsx
import { useState, useRef } from 'react';

/**
 * A headless hook for handling drag-and-drop reordering logic.
 * @param items - The current array of items.
 * @param onReorder - Callback that receives the newly ordered array.
 */
export function useSortableList<T>(
  items: T[],
  onReorder: (newItems: T[]) => void,
) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const isHandleAction = useRef(false);
  const hasHandleRegistered = useRef(false);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    // If a handle is used but the drag started elsewhere, cancel the drag.
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

  /**
   * Properties for the main list item container.
   */
  const getItemProps = (index: number) => ({
    draggable: true,
    onDragStart: (e: React.DragEvent) => handleDragStart(e, index),
    onDragEnter: () => handleDragEnter(index),
    onDragEnd: handleDragEnd,
    onDragOver: (e: React.DragEvent) => e.preventDefault(),
    onPointerDown: () => {
      isHandleAction.current = false;
    },
    isDragging: draggedIndex === index,
  });

  /**
   * Optional properties for a specific drag handle element.
   * Prevents event bubbling to ensure only the handle triggers movement.
   */
  const getHandleProps = () => {
    hasHandleRegistered.current = true;

    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.stopPropagation();
        isHandleAction.current = true;
      },
      style: { 
        userSelect: 'none' as const, 
        touchAction: 'none' as const,
        cursor: 'grab' 
      },
    };
  };

  return {
    getItemProps,
    getHandleProps,
    draggedIndex,
  };
}
```

---

## 2. API Reference

### `useSortableList<T>(items, onReorder)`

| Argument | Type | Description |
| :--- | :--- | :--- |
| `items` | `T[]` | The array of items to sort. |
| `onReorder` | `(newItems: T[]) => void` | Callback triggered when the items shift. |

### Return Values

| Return Property | Type | Description |
| :--- | :--- | :--- |
| `getItemProps` | `(index: number) => Props` | Props to spread on the draggable container (e.g. `<li>`). |
| `getHandleProps` | `() => Props` | Props to spread on an optional drag handle icon/element. |
| `draggedIndex` | `number \| null` | The index of the item currently being dragged. |

---

## 3. Usage Patterns

### Pattern A: Drag Anywhere
Best for simple lists where the entire card acts as the draggable area.

```tsx
import { useSortableList } from './use-sortable-list';

const MyList = () => {
  const [items, setItems] = useState(data);
  const { getItemProps } = useSortableList(items, setItems);

  return (
    <ul>
      {items.map((item, index) => {
        const { isDragging, ...props } = getItemProps(index);
        return (
          <li 
            key={item.id} 
            {...props} 
            className={isDragging ? 'opacity-20 bg-gray-100' : 'bg-white'}
          >
            {item.text}
          </li>
        );
      })}
    </ul>
  );
};
```

### Pattern B: Drag Handle Restricted
Recommended for complex items containing selectable text, buttons, or links. Dragging is automatically restricted to the handle once `getHandleProps` is invoked.

```tsx
import { useSortableList } from './use-sortable-list';

const MyList = () => {
  const [items, setItems] = useState(data);
  const { getItemProps, getHandleProps } = useSortableList(items, setItems);

  return (
    <ul>
      {items.map((item, index) => {
        const { isDragging, ...itemProps } = getItemProps(index);
        
        return (
          <li key={item.id} {...itemProps} className={isDragging ? 'opacity-25' : ''}>
            {/* The Handle */}
            <div {...getHandleProps()}> ☰ </div>
            
            {/* Main Content (remains selectable/interactive) */}
            <p>{item.text}</p>
            <button onClick={onDelete}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};
```

---

## 4. Key Implementation Features

- **Universal Detection**: The hook automatically detects if `getHandleProps` is used within a component. If it is, `onDragStart` is internally guarded to only trigger via the handle.
- **Pointer API**: Uses `onPointerDown` instead of `onMouseDown` for unified Mouse and Touch support.
- **Propagation Control**: Employs `e.stopPropagation()` on handles to prevent container events from resetting the drag permission state.
- **Zero Dependencies**: Pure React logic that leverages the browser's native capabilities for a tiny bundle size footprint.

## 5. Notes for Use

- **Keys**: Always use stable, unique identifiers (like `id`) for the `key` prop. **Do not use the array index.**
- **Accessibility**: Wrap list items in an `<ol>` or `<ul>` for semantic correctness.
- **Visuals**: Use the `isDragging` return value to provide visual feedback. native DnD relies on a "ghost image"; styling the source element to be translucent improves user orientation.