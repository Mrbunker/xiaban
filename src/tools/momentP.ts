import moment from "moment";

/** 输入"HH:mm"，返回当天该小时分钟的 Moment */
export const getHHmmMoment = (value: string) => {
  const [hours, minutes] = value.split(":");
  const result = moment().hours(Number(hours)).minutes(Number(minutes));
  return result;
};

/** 输入任意 moment string，返回 同小时分钟 日期为今天 的 Date */
export const getTodayDate = (value: moment.Moment) => {
  const h = moment(value).hours();
  const m = moment(value).minutes();
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
};
