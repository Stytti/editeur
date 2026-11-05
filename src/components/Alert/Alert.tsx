import './Alert.css';
import {useEffect} from "react";

interface AlertProps {
  message: string;
  onClose: () => void;
}

export function Alert({ message, onClose }: AlertProps) {

  useEffect(() => {
    const id = setTimeout(onClose, 5000);
    return () => clearTimeout(id);
  }, [message, onClose]);

  return (
    <div role="alert" className="alert">
      <span className="alert__message">{message}</span>
      <button type="button" className="alert__close" aria-label="Fermer" onClick={onClose}>✕</button>
    </div>
  );
}