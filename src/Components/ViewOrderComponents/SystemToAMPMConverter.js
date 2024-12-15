function convertToAmPm(timeStr) {
  // Parse the input time string to a Date object
  const date = new Date(`1970-01-01T${timeStr}`);

  // Get hours, minutes, and seconds
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  // Determine AM or PM suffix
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' should be '12'

  // Format minutes and seconds to always be two digits
  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  // Construct the final time string
  const ampmTime = `${hours}:${minutesStr}:${secondsStr} ${ampm}`;

  return ampmTime;
}

export default convertToAmPm;
