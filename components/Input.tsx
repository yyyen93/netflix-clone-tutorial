import React from 'react';

// [5] Create interface : define the types of the props that a component accepts.
interface InputProps{
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
    // ? means optional
}

// [1] Input Component
const Input: React.FC<InputProps> = ({
     // [6] react functional component assign InputProps to Input component
    id,
    onChange,
    value,
    label,
    type

}) => {

    return(
        // [2] A div element to wrap input element
        <div className="relative">
            {/* [3] Cool CSS input and label effect */}
            <input 
            // [7] Binded from InputProps
                onChange={onChange}
                type={type}
                value={value}
                id={id}
                className="
                    block
                    rounded-md
                    px-6
                    pt-6
                    pb-1
                    w-full
                    text-md
                    text-white
                    bg-neutral-700
                    appearance-none
                    focus:outline-none
                    focus:ring-0
                    peer
                "
                placeholder=" "
            />

            {/* [4] Cool CSS floating label */}
            <label 
            className="
            absolute
            text-md
            text-zinc-400
            duration-150
            transform
            -translate-y-3
            scale-75
            top-4
            z-10
            origin-[0]
            left-6
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-3
            
            "
            htmlFor={id}>
                {label}
            </label>
        </div>
    )
}

export default Input;

// peer: is like a neighbor to another element
// peer-placeholder-shown:scale-100 : This will trigger 'input' peer, placeholder shown. This is really cool, we can modify this label element by interacting the input element
//duration-150: Animation duration
//-translate-y-3: would move the element 3 pixels upwards from its original position. This property is often used in CSS animations or transitions to create a visual effect.
// z-10 : z-index
//origin-[0]: