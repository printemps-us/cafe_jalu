import React, {useState, useEffect} from 'react';
import AnimatedButton from './AnimatedButton';
// import {useForm, ValidationError} from '@formspree/react';
function ContactForm() {
  const handleSubmit = async () => {
    if (!isFormValid) return;
    const response = await fetch('https://formspree.io/f/xovlbzgg', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: formData.email,
        message: formData.message,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        subject: formData.dropdown,
      }),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      alert('There was an error submitting the form.');
    }
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    dropdown: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };
  // Validation Logic
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== '',
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  return (
    <div className="w-full flex justify-center">
      {!submitted ? (
        <div className="max-w-[500px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="name">Name</label>

            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border border-white-4 p-2 w-full rounded-xl"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-xl border-white-4"
                required
              />
            </div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-xl border-white-4"
              required
            />
            <label htmlFor="phone">Phone Number</label>

            <input
              type="tel"
              name="phone"
              placeholder="000-000-0000"
              value={formData.phone}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-xl border-white-4"
              required
            />
            <label htmlFor="Reason">Reason</label>
            <select
              name="dropdown"
              value={formData.dropdown}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-xl border-white-4"
              required
            >
              <option value="">Select an option</option>
              <option value="Careers at Printemps New York">
                Careers at Printemps New York
              </option>
              <option value="Client Services">Client Services</option>
              <option value="General Inquiries">General Inquiries</option>
              <option value="Press, Marketing, Events">
                Press, Marketing, Events
              </option>
              <option value="Services at Printemps New York">
                Services at Printemps New York
              </option>
              <option value="Unsubscribe from the Newsletter">
                Unsubscribe from the Newsletter
              </option>
              <option value="Vendors & Collaborations">
                Vendors & Collaborations
              </option>
            </select>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              className="border p-2 w-full rounded-xl border-white-4"
              required
            />

            <AnimatedButton
              text={'Submit'}
              noMaxWidth
              bgColor={'black'}
              hoverColor={'#00D072'}
              h="42px"
              w="100%"
              onClick={handleSubmit}
              disabled={!isFormValid}
            />
          </form>
        </div>
      ) : (
        <div className="label-desktop text-center py-[100px]">
          Thank you for contacing us!<br></br> A team member will reach out to
          you shortly.
        </div>
      )}
    </div>
  );
}

export default ContactForm;
