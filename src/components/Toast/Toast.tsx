import { useEffect } from "react";
import style from "./Toast.module.scss";

export type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ onClose, message }: ToastProps) {
  useEffect(() => {
    const timerId = setTimeout(onClose, 4000);
    return () => clearTimeout(timerId);
  }, [message, onClose]);

  return (
    <div className={style.toastWrapper} role="alert">
      <p>{message}</p>
    </div>
  );
}
