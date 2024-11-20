// @ts-nocheck
import React, { useState } from 'react';
import styles from './Keyboard.module.css';

export default function Keyboard({
  inputText,
  setInputText,
}: {
  inputText: string,
  setInputText: (value: string) => void,
}) {
    const [isCaps, setIsCaps] = useState(false);
    const [isShift, setIsShift] = useState(false);

    const firstLine = ['~,`', '!,1', '@,2', '#,3', '$,4', '%,5', 
      '^,6', '&,7', '*,8', '(,9', '),0', '_,-', '+,=', 
      'Apagar'];

    const secondLine = (isShift || isCaps) ? ['Q', 'W', 'E', 'R', 'T', 'Y',
      'U', 'I', 'O', 'P', '{_[', '}_]', '|_\\'] : ['q', 'w', 'e', 'r', 't', 'y',
        'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\']
    
    const tirdLine = (isShift || isCaps) ? ['Fixa', 'A', 'S', 'D', 'F', 'G', 'H', 
      'J', 'K', 'L', ':_;', `"_'`] : ['Fixa', 'a', 's', 'd', 'f', 'g', 'h', 
        'j', 'k', 'l', ':_;', `"_'`]

    const fourthLine = (isShift || isCaps) ? ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M',
      '<_,', '>_.', '?_/', '@outlook.com'] : ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm',
        '<_,', '>_.', '?_/', '@outlook.com']

    const fifthLine = ['@', '.com', '.com.br' , ' ', '@gmail.com']

    const handleKeyClick = (key: string) => {
        if (isShift) {
            setIsShift(!isShift);
        }
       

      if (key === 'Enter') {
          handleEnterKey();
      } 
      else if (key === ' ') {
          handleSpaceKey();
      } else if (key === 'Fixa') {
          handleCapsLock();
      } else if (key === 'Apagar') {
          handleDeleteKey();
      } else if (key === 'Shift') {
          handleShiftKey();
      } else if (key === 'Tab') {
          handleTabKey();
      } else {
          handleRegularKey(key);
      }
    };
    const handleSpaceKey = () => {
        const newContent = inputText + '\u00A0';
        setInputText(newContent);
    };

    const handleEnterKey = () => {
        const newContent = inputText + '\n';
        setInputText(newContent);
    };

    const handleCapsLock = () => {
        const updatedCaps = !isCaps;
        setIsCaps(updatedCaps);
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            const firstSpanElement = key.querySelector('span:first-child');
            if (firstSpanElement) {
                const keyText = firstSpanElement.innerText.toLowerCase();
                if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab']
                    .includes(keyText)) {
                    firstSpanElement.innerText = 
                    ((updatedCaps && isShift) || (!updatedCaps && !isShift)) 
                    ? keyText.toLowerCase() : keyText.toUpperCase();
                }
                if (keyText === 'caps lock') {
                    firstSpanElement.parentElement.style.backgroundColor = 
                    (updatedCaps) ? 'blue' : '#445760';
                }
            }
        });
    };

    const handleTabKey = () => {
        const newContent = inputText + '    ';
        setInputText(newContent);
    };

    const handleDeleteKey = () => {
        if (inputText.length === 0) {
            return;
        }
        const newContent = inputText.slice(0, inputText.length - 1);
        setInputText(newContent);
    };

    const handleShiftKey = () => {
        setIsShift(!isShift);
        const keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            const firstSpanElement = key.querySelector('span:first-child');
            if (firstSpanElement) {
                const keyText = firstSpanElement?.innerText.toLowerCase();
                if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].
                    includes(keyText)) {
                    firstSpanElement.innerText = 
                    ((updatedShift && isCaps) || (!updatedShift && !isCaps)) 
                    ? keyText.toLowerCase() : keyText.toUpperCase();
                }
                if (keyText === 'shift') {
                    firstSpanElement.parentElement.style.backgroundColor = 
                    (updatedShift) ? 'blue' : '#445760';
                }
            }
        });
    }

    const handleRegularKey = (key) => {
        const keys = key.split(/[,_]/);
        let newContent;
        if (keys.length > 1) {
            if (isShift) {
                if (keys.length === 3) {
                    if (keys[0] === '>') newContent = inputText + '>';
                    else newContent = inputText + '_';
                }
                else newContent = inputText + keys[0];
            } else {
                if (keys.length === 3) {
                    if (keys[0] === '>') newContent = inputText + '.';
                    else newContent = inputText + '-';
                }
                else newContent = inputText + keys[1];
            }
        } else {
            const character = ((isShift && isCaps) || (!isShift && !isCaps)) 
            ? key.toLowerCase() : key.toUpperCase();
            newContent = inputText + character;
        }
        setInputText(newContent);
    };

    return (
        <div className={styles.keyboard}>
            <div className={styles.keyboardcontainer}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        {firstLine.map((keyvalue) => 
                        (
                            <div key={keyvalue} className={styles.key} 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {keyvalue.includes(',') ? (
                                    keyvalue.split(',').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    keyvalue === 
                                      '<i className="fa-solid fa-delete-left"></i>' 
                                     ? (
                                        <i className="fa-solid fa-delete-left"></i>
                                    ) : (
                                        <span>{keyvalue}</span>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        {secondLine.map((keyvalue) => (
                            <div key={keyvalue} className={styles.key} 
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {keyvalue.includes('_') ? (
                                    keyvalue.split('_').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    <span>{keyvalue}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        {tirdLine.map((keyvalue) => (
                            <div key={keyvalue} className={styles.key}
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {keyvalue.includes('_') ? (
                                    keyvalue.split('_').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    <span>{keyvalue}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        {fourthLine.map((keyvalue, index) => (
                            <div key={index} className={styles.key}
                                 onClick={() => handleKeyClick(keyvalue)}>
                                {keyvalue.includes('_') ? (
                                    keyvalue.split('_').map((part, index) => (
                                        <span key={index}>{part}</span>
                                    ))
                                ) : (
                                    <span>{keyvalue}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.row}>
                        {fifthLine.map((keyvalue, index) => (
                            <div key={index} className={styles.key} 
                            onClick={() => handleKeyClick(keyvalue)}>
                                <span>{keyvalue}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}