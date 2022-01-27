import { useRef } from "react";

const useValidation = (validationFn) => {
  const inputRef = useRef();
  const isInputValid = validationFn(inputRef.current.value);

  return {
    inputRef,
    isInputValid,
  };
};

export default useValidation;
