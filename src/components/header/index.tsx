import React from 'react';
import { FiHelpCircle } from "react-icons/fi";
import { FiSave } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

function Header() {
  return (
    <header>
        <h2>DRUM RANDOMIZER</h2>
        <button className={'btn-icon btn-help'}>
           <FiHelpCircle />
        </button>
        <button disabled className={'btn-icon btn-save'}>
           <FiSave />
        </button>
        <button className={'btn-icon btn-search'}>
           <FiSearch />
        </button>
        <input type="text" name="filter" placeholder={'Filter...'} />
    </header>
  );
}

export default Header;
