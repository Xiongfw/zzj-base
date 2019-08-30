/** 数据脱敏 */
function masking(value, start = 3, end = start) {
  if (!value) return "";
  if (start + end > value.length) return value;
  const startStr = value.substring(0, start);
  const endStr = value.slice(end / -1);
  const length = value.length - (start + end);
  let tempStr = "";
  for (let i = 0; i < length; i++) {
    tempStr += "*";
  }
  return startStr + tempStr + endStr;
}

export default masking