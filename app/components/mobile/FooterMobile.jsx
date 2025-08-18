import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';

function FooterMobile({instagram = false}) {
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
        data_source: 'maison passerelle',
      },
    );
    exponea.track('consent', {
      category: 'mp_email',
      valid_until: 'unlimited',
      action: 'accept',
      data_source: 'maison passerelle',
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
    <div className="w-full">
      {/* Above Footer Section */}
      <div className="bg-[#AF4145] flex flex-col items-center gap-4 py-8 px-4">
        {instagram && (
          <a
            href="https://urlgeni.us/instagram/maisonpasserellenyc"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/IG_LOGO.png?v=1736792345"
              alt="Instagram Logo"
              width={42}
            />
          </a>
        )}
        <p className="moderat-bold text-center text-sm leading-relaxed" style={{color: '#e8d09b'}}>
          Maison Passerelle is part of Printemps new york, For more information
          sign up for our newsletter
        </p>
      </div>

      {/* Footer Newsletter Section */}
      <div className="bg-[#e8d09b] flex flex-col items-center gap-4 py-6 px-4">
        <p className="moderat-bold text-center text-sm text-black">
          {state.isSubmitted ? 'Merci!' : 'Sign up for our newsletter'}
        </p>
        
        {state.isSubmitted ? (
          <p className="moderat-bold text-center text-sm text-black">
            Check your email for updates
          </p>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <input
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              className="moderat-bold w-full px-4 py-3 text-sm bg-white border-0 rounded-md"
              style={{fontSize: '14px'}}
            />
            <button
              className={`w-full py-3 px-6 rounded-md moderat-bold text-sm ${
                validEmail.test(email) 
                  ? 'bg-[#AF4145] text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}
              onClick={handleSubmit}
              disabled={!validEmail.test(email)}
              style={{cursor: !validEmail.test(email) ? 'auto' : 'pointer'}}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FooterMobile;
