import React, { useEffect } from 'react';
import { FiGithub } from 'react-icons/fi';

function IntroPopup() {

  useEffect(() => {
    const el = document.querySelector('.Intro-Popup');
    setTimeout(() => el?.classList.add('hide'), 3000);
  });

  return (
    <div className={'Intro-Popup'}>
        <h2>EXPERIMENTAL DRUM RANDOMIZER MACHINE</h2>
        <p>Create drum machine with random sounds and midi patterns generated by AI and machine learning algorithms! Read more about the project and milestones on Github!</p>
        <h3>LOADING DATASET...</h3>
        <FiGithub />
        <a href={''}>contribute to this project</a>
    </div>
  );
}

export default IntroPopup;
