import React from 'react';

// [2] Make it more modular
interface NavbarItemProps{
    label: string;
}

// [1]
const NavbarItem: React.FC<NavbarItemProps> = ({label}) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    )
}

export default NavbarItem;


/**
 * In React, modularity refers to the practice of breaking down the user interface into reusable and independent components. React encourages a modular approach to building UIs, where each component represents a self-contained unit with its own logic and rendering.
 */


/**
 * In TypeScript, React.FC<NavbarItemProps> is a type annotation used to define a functional component in React. It stands for React Function Component and indicates that the annotated function is intended to be used as a React component.
 */