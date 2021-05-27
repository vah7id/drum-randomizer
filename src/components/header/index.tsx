import React from 'react';
import { FiGithub } from "react-icons/fi";
import { FiSave } from "react-icons/fi";

function Header() {
  return (
    <header>
        <h2>DRUM RANDOMIZER</h2>
        <span>(VER 0.0.9)</span>
        <a target={'_blank'} rel="noreferrer" href={'https://github.com/vah7id/drum-randomizer'} className={'btn-icon btn-help'}>
           <FiGithub />
        </a>
        <button disabled className={'btn-icon btn-save'}>
           <FiSave />
        </button>
    </header>
  );
}

export default Header;
