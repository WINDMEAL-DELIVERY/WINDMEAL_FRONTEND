export function formatDateTime(dateTimeString: string) {
  const inputDate = new Date(dateTimeString);
  const currentDate = new Date();

  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    const differenceInMinutes = Math.floor(
      (currentDate.getTime() - inputDate.getTime()) / (1000 * 60),
    );
    if (differenceInMinutes < 60) {
      return `${differenceInMinutes}분 전`;
    }
    const hours = inputDate.getHours() % 12 || 12;
    const minutes = inputDate.getMinutes();
    const ampm = inputDate.getHours() >= 12 ? '오후' : '오전';
    return `${ampm} ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear()
  ) {
    return '어제';
  }

  const year =
    inputDate.getFullYear() !== currentDate.getFullYear()
      ? `${inputDate.getFullYear()}.`
      : '';
  const month = inputDate.getMonth() + 1;
  const day = inputDate.getDate();
  return `${year}${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day}`;
}
