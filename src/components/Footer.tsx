import React from 'react';
import githubLogo from '../assets/github-logo.png';
import '../styles/footerStyle.scss';

interface FooterProps {
  projectName: string;
}

function Footer({ projectName }: FooterProps): JSX.Element  {
  return (
    <footer>
      <h2>Héctor González Orozco</h2>
      <a href={`https://github.com/hectorgonzalezo/${projectName}`}>
        <img alt="github logo" id="github-logo" src={githubLogo} />
      </a>
    </footer>
  );
}

export default Footer;
