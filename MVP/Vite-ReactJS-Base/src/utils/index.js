import { message } from "antd";

export const copyToClipBoard = async (
  text = "",
  notiText = "Copy successfully!"
) => {
  await navigator.clipboard.writeText(text);
  message.success(notiText);
};
