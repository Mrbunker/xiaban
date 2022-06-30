/** 输入"HH:mm"，返回当天该小时分钟的 Date 格式 */
export const getToday = (value: string) => {
  const valueSplit = value.split(":");
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(valueSplit[0]), Number(valueSplit[1]));
};
