import { useFavicon, useTitle } from "ahooks";
import { useState } from "preact/hooks";

/** 设置网页标题为倒计时，设置网页默认 icon ，返回一个 setIcon （用在触发 onEnd 时更换） */
export const useSetDoc = ({ minutes, hours }: { minutes: number; hours: number }, defaultIconUrl: string) => {
  useTitle(`${Number(minutes) + Number(hours) * 60}分钟`);
  const [icon, setIcon] = useState(defaultIconUrl);
  useFavicon(icon);
  return { setIcon };
};
