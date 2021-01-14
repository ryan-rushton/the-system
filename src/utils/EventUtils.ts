import React from 'react';

export const getOnEnterPress = (callback: () => void): ((e: React.KeyboardEvent<HTMLDivElement>) => void) => {
  return (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      callback();
    }
  };
};
