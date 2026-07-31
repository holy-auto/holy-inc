import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  delay?: number;
  cursorColor?: string;
}

const TypingText: FC<TypingTextProps> = ({
  text,
  className = '',
  onComplete,
  delay = 0,
  cursorColor = 'currentColor',
}) => {
  const [visible, setVisible] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    const timeoutId = setTimeout(() => {
      onCompleteRef.current?.();
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [visible]);

  return (
    <span className={`inline-block ${className}`}>
      <span
        className={`inline-block transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {text}
      </span>
      <span
        className={`inline-block w-[2px] h-[0.85em] ml-0.5 align-middle animate-pulse transition-opacity duration-300 ${
          visible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ backgroundColor: cursorColor }}
      />
    </span>
  );
};

export default TypingText;