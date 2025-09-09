import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import IG from '~/assets/JaluIG.png'
function FooterMobile({instagram = false}) {
  const [state, setState] = useState({
    isWaiting: false,
    isSubmitted: false,
    isError: false,
  });
  const [email, setEmail] = useState('');
  const url = 'https://printempsnewyork.activehosted.com/proc.php?jsonp=true';

  async function handleSubmit() {
    try {
      const response = await fetch(
        'https://a.klaviyo.com/client/subscriptions/?company_id=XZQ3Bm',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Revision: '2025-01-15', // required by Klaviyo
          },
          body: JSON.stringify({
            data: {
              type: 'subscription',
              attributes: {
                custom_source: 'Cafe Jalu Website',
                profile: {
                  data: {
                    type: 'profile',
                    attributes: {
                      email,
                      // first_name: firstName,
                      // last_name: lastName,
                    },
                  },
                },
              },
              relationships: {
                list: {
                  data: {
                    type: 'list',
                    id: 'R949bn', // your list ID
                  },
                },
              },
            },
          }),
        },
      );

      if (response.ok) {
        setState({
          isWaiting: false,
          isSubmitted: true,
        });
      } else {
        console.error('Failed to subscribe:', await response.json());
      }
    } catch (err) {
      console.error('Error subscribing:', err);
    }
  }

  // NOTE • Valid Email checker
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  return (
    <div className="w-full">
      {/* Above Footer Section */}
      <div className="bg-[#c5e4e4] flex flex-col items-center gap-4 py-8 px-4">
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
        <p
          className="moderat-bold text-center text-sm leading-relaxed"
          style={{color: '#000'}}
        >
          Cafe Jalu is part of Printemps new york, For more information sign up
          for our newsletter
        </p>
      </div>

      {/* Footer Newsletter Section */}
      <div className="bg-[#00d58d] flex flex-col items-center gap-4 py-6 px-4">
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
                  ? 'bg-[#000] text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}
              onClick={handleSubmit}
              disabled={!validEmail.test(email)}
              style={{cursor: !validEmail.test(email) ? 'auto' : 'pointer'}}
            >
              Submit
            </button>
            <div className="flex justify-center">
              <a
                href="https://urlgeni.us/instagram/cafejalu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={IG} alt="Instagram Logo" width={80} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FooterMobile;
