import React from 'react';
import insta from '~/assets/instagramLogo.png';

export function FormattedText({text, instaToggle}) {
  if (!text) {
    return null;
  }

  const rawLines = text.replace(/\/n/g, '<br><br>').split(/<br>/);

  const content = rawLines.map((line, index) => {
    let formattedLine = line
      .replace(
        /<link>(.*?)\?\?(.*?)<link>/g,
        (_, linkText, linkHref) =>
          `<a 
            href="${linkHref}" 
            ${
              linkHref.startsWith('/')
                ? ''
                : 'target="_blank" rel="noopener noreferrer"'
            }
            style="color: #565656; text-decoration: underline;"
          >
            ${linkText}
          </a>`,
      )
      .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
      .replace(/<i>(.*?)<\/i>/g, '<em>$1</em>')
      .replace(
        /<u>(.*?)<\/u>/g,
        '<span style="text-decoration: underline;">$1</span>',
      )
      .replace(/<bullet>/g, '• ')
      .replace(
        /~link~(.*?)\?\?(.*?)~link~/g,
        (_, linkText, linkHref) =>
          `<a 
            href="${linkHref}" 
            ${
              linkHref.startsWith('/')
                ? ''
                : 'target="_blank" rel="noopener noreferrer"'
            }
            style="color: #565656; text-decoration: underline;"
          >
            ${linkText}
          </a>`,
      )
      .replace(/~bold~(.*?)~bold~/g, '<strong>$1</strong>')
      .replace(/~italics~(.*?)~italics~/g, '<em>$1</em>')
      .replace(/~break~/g, '<br />');

    const isLastLine = index === rawLines.length - 1;

    return (
      <React.Fragment key={index}>
        <span
          className="inline"
          dangerouslySetInnerHTML={{__html: formattedLine}}
        />
        {isLastLine && instaToggle ? (
          <>
            {' '}
            <a
              href={instaToggle}
              target="_blank"
              rel="noopener noreferrer"
              className="inline align-text-bottom"
            >
              <img
                src={insta}
                alt="Instagram icon"
                width={13}
                className="inline-block ml-1"
              />
            </a>
          </>
        ) : null}
        {!isLastLine && <br />}
      </React.Fragment>
    );
  });

  return <div className="inline">{content}</div>;
}
