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
    const MIDDLE_Y = 200;
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

    // 터치 시작 시
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      // 현재 바텀 시트의 최상단 모서리 값
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      // 터치한 곳의 수직(Y) 좌표
      touchStart.touchY = e.touches[0].clientY;
    };

    // 터치를 유지한 채로 움직일 때(=드레그 할 때)
    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

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
        document.body.style.overflowY = 'hidden'; // 컨텐츠 스크롤 시
      }

      touchMove.prevTouchY = currentTouch.clientY;
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      // 드래그가 끝난 후 바텀시트의 최상단 모서리 Y
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      // 최상단 모서리가 올라갈 수 있는 최대치가 아니라면
      if (currentSheetY !== MIN_Y) {
        // 아래로 드래그 시 바텀 시트 1단계로 축소
        if (touchMove.movingDirection === 'down') {
          sheet.current!.style.setProperty('transform', 'translateY(0)');
        }

        // 위로 드래그 시 3단계로 확대
        if (touchMove.movingDirection === 'up') {
          sheet.current!.style.setProperty(
            'transform',
            `translateY(${MIN_Y - MAX_Y}px)`,
          );
        }
      }

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

    const handleMouseMove = (e: MouseEvent) => {
      const { touchStart, touchMove } = metrics.current;

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < e.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > e.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        const touchOffset = e.clientY - touchStart.touchY;
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

      touchMove.prevTouchY = e.clientY;
    };

    const handleMouseUp = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;
      const currentSheetY = sheet.current!.getBoundingClientRect().y;
      console.log('currentSheetY', currentSheetY);

      // 중간 단계 sheety = 280, 1단계 sheety = 648
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
          if (currentSheetY >= 280 && currentSheetY <= 648) {
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

        // if (currentSheetY > MIN_Y && currentSheetY < MIDDLE_Y) {
        //   sheet.current!.style.setProperty(
        //     'transform',
        //     `translateY(${MIDDLE_Y - MAX_Y}px)`,
        //   );
        // }
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

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
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.clientY;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    sheet.current!.addEventListener('touchstart', handleTouchStart);
    sheet.current!.addEventListener('touchmove', handleTouchMove);
    sheet.current!.addEventListener('touchend', handleTouchEnd);
    sheet.current!.addEventListener('mousedown', handleMouseDown);

    return () => {
      sheet.current!.removeEventListener('touchstart', handleTouchStart);
      sheet.current!.removeEventListener('touchmove', handleTouchMove);
      sheet.current!.removeEventListener('touchend', handleTouchEnd);
      sheet.current!.removeEventListener('mousedown', handleMouseDown);

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener('touchstart', handleTouchStart);

    return () => {
      content.current!.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return { sheet, content };
}
