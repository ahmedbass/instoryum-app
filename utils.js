export const getDateDistance = (date, short = false) => {
  if (!date) return;
  const now = new Date();
  const postDate = new Date(date);

  const getMonthName = (index) =>
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][index];
  const olderYear = () => now.getFullYear() > postDate.getFullYear();
  const olderMonth = () => now.getMonth() > postDate.getMonth();
  const olderDay = () =>
    now.getDate() - postDate.getDate() > 1 ||
    (now.getDate() > postDate.getDate() && now.getHours() > postDate.getHours());
  const olderHour = () =>
    now.getHours() > postDate.getHours() || now.getDate() - postDate.getDate() === 1;
  const olderMinute = () => now.getMinutes() > postDate.getMinutes();
  const olderSecond = () => now.getSeconds() >= postDate.getSeconds();
  const postDateAfterNow = () => postDate.getTime() > now.getTime();
  const getWeekCount = () =>
    Math.floor(
      (now.getFullYear() - postDate.getFullYear()) * 52 +
        (now.getMonth() - postDate.getMonth()) * 4.3 +
        (now.getDate() - postDate.getDate()) / 7
    );

  if (postDateAfterNow()) {
    return postDate;
  } else if (olderYear()) {
    return short
      ? `${getWeekCount()}w`
      : `${getMonthName(postDate.getMonth())} ${postDate.getDate()}, ${postDate.getFullYear()}`;
  } else if (olderMonth()) {
    return short
      ? `${getWeekCount()}w`
      : `${getMonthName(postDate.getMonth())} ${postDate.getDate()}`;
  } else if (olderDay()) {
    const diff = now.getDate() - postDate.getDate();
    return short ? `${diff}d` : `${diff} ${diff > 1 ? "days" : "day"} ago`.toUpperCase();
  } else if (olderHour()) {
    const hoursDiff = now.getHours() - postDate.getHours();
    const diff = hoursDiff > 0 ? hoursDiff : hoursDiff + 24;
    return short ? `${diff}h` : `${diff} ${diff > 1 ? "hours" : "hour"} ago`.toUpperCase();
  } else if (olderMinute()) {
    const diff = now.getMinutes() - postDate.getMinutes();
    return short ? `${diff}m` : `${diff} ${diff > 1 ? "minutes" : "minute"} ago`.toUpperCase();
  } else if (olderSecond()) {
    return short
      ? `${now.getSeconds() - postDate.getSeconds()}s`
      : `a few seconds ago`.toUpperCase();
  }
};

export const getReadableDateTime = (date) => {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const postDate = new Date(date);
  const now = new Date();
  const dateDiff = now - postDate;
  let dateOptions;
  if (dateDiff > ONE_DAY * 7) {
    dateOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  } else if (dateDiff >= ONE_DAY || now.getDate() !== postDate.getDate()) {
    dateOptions = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
    };
  } else {
    dateOptions = {
      hour: "numeric",
      minute: "numeric",
    };
  }
  return postDate.toLocaleString("en-US", dateOptions).replace("AM", "am").replace("PM", "pm");
};

export const formatNumber = (number) => {
  const ONE_BILLION = 1000000000;
  const ONE_MILLION = 1000000;
  const THOUSAND = 1000;
  let tag = "";
  let divideBy = 1;

  if (number >= ONE_BILLION) {
    tag = "B";
    divideBy = ONE_BILLION;
  } else if (number >= ONE_MILLION) {
    tag = "M";
    divideBy = ONE_MILLION;
  } else if (number >= THOUSAND * 20) {
    tag = "K";
    divideBy = THOUSAND;
  }

  number = (number / divideBy).toFixed(1).replace(",0", "");
  let nf = new Intl.NumberFormat("en-US");
  return nf.format(number) + tag;
};

export const applyLineBreaks = (string) =>
  string?.split("\\n")?.map((item, i) => <p key={i}>{item}</p>);

export const getRandomProfilePic = () =>
  `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 70)}`;

export const isOnlyEmoji = (string) => {
  const emoji_regex =
    /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
  return emoji_regex.test(string);
};

export const scaleNumbers = (unscaledValue, min, max, minAllowed, maxAllowed) =>
  Math.round(((unscaledValue - min) * (maxAllowed - minAllowed)) / (max - min) + minAllowed);
