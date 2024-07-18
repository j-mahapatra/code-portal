export function formatToDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString(
    navigator.language ?? 'en-US',
    options
  );
  const [month, day, year] = formattedDate.split(' ');
  return `${day.replace(',', '')}, ${month}, ${year}`;
}
