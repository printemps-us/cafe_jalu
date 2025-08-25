import React from 'react';

function Chip({
  text,
  selected = false,
  setSelected,
  id,
  variant,
  border = false,
  isMobile = false,
  disabled,
}) {
  function handleClick() {
    if (variant) {
      setSelected(variant);
    } else {
      setSelected(id);
    }
  }
  return (
    <button
      className={`rounded-3xl px-3 w-auto h-9  text-center border-white-4 flex items-center justify-center ${
        disabled ? 'bg-white-4' : ''
      } ${selected === id ? 'bg-[#c5e4e4]' : 'hover:bg-white-4'} ${
        border ? 'border-1' : 'border-0'
      } ${isMobile ? 'p-small-regular-mobile' : 'p-standard-medium-desktop'}`}
      onClick={handleClick}
      style={{cursor: disabled ? 'default' : 'pointer'}}
      disabled={disabled}
    >
      <span
        className={`${
          isMobile ? 'text-xs font-bold uppercase' : 'label-desktop'
        } ${disabled ? 'line-through' : ''} leading-none`}
        style={selected === id ? { color: '#000' } : {}}
      >
        {text}
      </span>
    </button>
  );
}

export default Chip;
