/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import { useRef, useEffect, useState } from 'react';
import { List, ListCenter, ListItem } from '@components/time-picker/style';

interface ScrollPickerProps {
  list: (string | number)[];
  onSelectedChange?: (selected: string | number) => void;
}

export default function TimePicker({
  list,
  onSelectedChange,
}: ScrollPickerProps) {
  const SCROLL_DEBOUNCE_TIME = 100;

  const newList = ['', ...list, ''];
  const ref = useRef<HTMLUListElement>(null);
  const [selected, setSelected] = useState(1);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const ITEM_HEIGHT = 50;

  const handleScroll = () => {
    if (ref.current) {
      clearTimeout(timerRef.current!);
      if (ref.current.scrollTop < ITEM_HEIGHT) {
        ref.current.scrollTop = ITEM_HEIGHT;
      }
      timerRef.current = setTimeout(() => {
        const index = Math.floor(
          (ref.current!.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT,
        );
        if (list[index] !== '') {
          setSelected(index);
          itemRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          if (onSelectedChange) onSelectedChange(newList[index]);
        }
      }, SCROLL_DEBOUNCE_TIME);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = selected * ITEM_HEIGHT;
    }
  }, []);

  return (
    <List ref={ref} onScroll={handleScroll}>
      <ListCenter />
      {newList.map((item, index) => (
        <ListItem
          key={index}
          $isSelected={index === selected}
          ref={el => {
            itemRefs.current[index] = el;
          }}
        >
          {item}
        </ListItem>
      ))}
    </List>
  );
}
