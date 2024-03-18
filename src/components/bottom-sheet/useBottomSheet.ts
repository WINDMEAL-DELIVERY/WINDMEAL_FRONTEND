import { useEffect, useRef } from 'react';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // BottomSheet의 최상단 모서리의 Y값
    touchY: number; // 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
  isContentAreaTouched: boolean;
}

export default function useBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const MIN_Y = 60;
    const MIDDLE_Y = 280;
    const MAX_Y = window.innerHeight - 160;

    // 바텀 시트가 움직일 수 있는지 판별
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      // 컨텐츠 영역 밖에 터치
      if (!isContentAreaTouched) {
        return true;
      }

      // 바텀 시트가 최대로 올라온 상태 아니면
      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }

      // 위에서 아래로 스크롤하는데 컨텐트 내용 없다면
      if (touchMove.movingDirection === 'down') {
        return content.current!.scrollTop <= 0;
      }

      // 이외엔 바텀시트는 움직일 수 없음
      return false;
    };

    const handleStart = (e: TouchEvent | MouseEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;

      if (e instanceof TouchEvent) {
        touchStart.touchY = e.touches[0].clientY;
      } else if (e instanceof MouseEvent) {
        touchStart.touchY = e.clientY;
      }
    };

    const handleMove = (e: TouchEvent | MouseEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e instanceof TouchEvent ? e.touches[0] : e;

      // 드래그 방행 정하는 로직
      // 일단 prevTouchY의 값이 없다면 터치를 처음 시작했을 때의 y축 값
      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      // 드래그한 현재 값이 이전 터치값(prevmove) 보다 크고 작은 것에 따라 방향 정함
      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      // 바텀시트를 움직이는 로직
      // 바텀시트를 움직일 수 있는 상황이면
      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        // 현재 터치값과 처음 터치값의 차이(Y) (이만큼 이동해야함)
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        // 처음 시트의 높이에서 위 오프셋만큼 움직인 y값 (시트의)
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }

        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        sheet.current!.style.setProperty(
          'transform',
          `translateY(${nextSheetY - MAX_Y}px)`,
        );
      } else {
        document.body.style.overflowY = 'hidden';
      }

      touchMove.prevTouchY = currentTouch.clientY;
    };

    const handleEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      // 최상단 모서리가 올라갈 수 있는 최대치가 아니라면
      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === 'down') {
          if (currentSheetY > MIN_Y && currentSheetY < MIDDLE_Y + 50) {
            sheet.current!.style.setProperty(
              'transform',
              `translateY(${MIDDLE_Y - MAX_Y}px)`,
            );
          } else sheet.current!.style.setProperty('transform', 'translateY(0)');
        }

        if (touchMove.movingDirection === 'up') {
          if (currentSheetY >= 280 && currentSheetY <= 800) {
            sheet.current!.style.setProperty(
              'transform',
              `translateY(${MIDDLE_Y - MAX_Y}px)`,
            );
          } else {
            sheet.current!.style.setProperty(
              'transform',
              `translateY(${MIN_Y - MAX_Y}px)`,
            );
          }
        }
      }

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);

      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      handleStart(e);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    };

    const handleTouchStart = (e: TouchEvent) => {
      handleStart(e);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    sheet.current!.addEventListener('touchstart', handleTouchStart);
    sheet.current!.addEventListener('touchmove', handleMove);
    sheet.current!.addEventListener('touchend', handleTouchEnd);
    sheet.current!.addEventListener('mousedown', handleMouseDown);
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener('touchstart', handleTouchStart);
    content.current!.addEventListener('mousedown', handleTouchStart);

    return () => {
      content.current!.removeEventListener('touchstart', handleTouchStart);
      content.current!.removeEventListener('mousedown', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // 컨텐츠 영역을 터치로 스크롤할 수 있도록 설정
      e.stopPropagation();
    };

    content.current!.addEventListener('touchmove', handleTouchMove);

    return () => {
      content.current!.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return { sheet, content };
}
