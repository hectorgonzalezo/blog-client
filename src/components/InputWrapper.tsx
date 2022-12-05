import React, { MutableRefObject } from 'react';
import { capitalize } from 'lodash';

interface inputWrapperProps {
  name: string;
  errRef: MutableRefObject<null | HTMLSpanElement>;
  children: JSX.Element
}

function InputWrapper({name, errRef, children}: inputWrapperProps): JSX.Element {
  return(
    <div className="input_wrapper">
      <label htmlFor={name}>{capitalize(name.split(/(?=[A-Z])/g).join(' '))}</label>
      {children}
      <span className="error" aria-live="polite" ref={errRef}/>
    </div>
  )
}

export default InputWrapper
