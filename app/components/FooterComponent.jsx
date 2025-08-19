import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
function FooterComponent({instagram = false}) {
  const [state, setState] = useState({
    isWaiting: false,
    isSubmitted: false,
    isError: false,
  });
  const [email, setEmail] = useState('');
  const url = 'https://printempsnewyork.activehosted.com/proc.php?jsonp=true';

  function handleSubmit() {
    exponea.identify(
      {email_id: email.toLowerCase()},
      {
        email: email.toLowerCase(),
        data_source: 'Cafe Jalu',
      },
    );
    exponea.track('consent', {
      category: 'mp_email',
      valid_until: 'unlimited',
      action: 'accept',
      data_source: 'Cafe Jalu',
    });
    setState({
      isWaiting: false,
      isSubmitted: true,
    });
  }
  // NOTE • Valid Email checker
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );
  return (
    <div className="footer-container">
      <div className="above-footer bg-[#c5e4e4]">
        {instagram && (
          <a
            href="https://urlgeni.us/instagram/maisonpasserellenyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/IG_LOGO.png?v=1736792345"
              alt="Instagram Logo"
              width={42}
            />
          </a>
        )}
        <p className="moderat-bold sign-up-text" style={{color: '#000'}}>
          Cafe Jalu is part of Printemps new york, For more information
          sign up for our newsletter
        </p>
      </div>
      <div className="footer-area">
        <p
          className="moderat-bold"
          style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
        >
          {state.isSubmitted ? 'Merci!' : 'Sign up for our newsletter'}
        </p>
        {state.isSubmitted ? (
          <p
            className="moderat-bold"
            style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
          >
            Check your email for updates
          </p>
        ) : (
          <input
            value={email}
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
            className="moderat-bold footer-input bg-white"
            style={{fontSize: '12px'}}
          ></input>
        )}
        {state.isSubmitted ? (
          <p></p>
        ) : (
          <button
            className="footer-button"
            onClick={handleSubmit}
            disabled={!validEmail.test(email)}
            style={{cursor: !validEmail.test(email) ? 'auto' : 'pointer'}}
          >
            <p
              className="moderat-bold"
              style={{fontSize: '12px', color: 'white'}}
            >
              Submit
            </p>
          </button>
        )}
      </div>
    </div>
  );
}

export default FooterComponent;
