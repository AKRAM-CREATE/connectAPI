import { useEffect } from "react";

export function useClickoutside(ref, onOutsideClick) {
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          onOutsideClick();
        }
      }

      document.addEventListener("mousedown", handleClick);

      return () => document.removeEventListener("mousedown", handleClick);
    },
    [ref, onOutsideClick]
  );
}
