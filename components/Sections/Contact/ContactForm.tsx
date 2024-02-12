import emailjs from '@emailjs/browser';
import {FC, memo, useRef, useState} from 'react';

const ContactForm: FC = memo(() => {
  const form = useRef(null);

  const [emailSent, setEmailSent] = useState<boolean>(false);

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.current &&
      emailjs.sendForm('service_xm9bqxy', 'template_uq22k5j', form.current, 'CQgadqY444YV2lQI8').then(
        result => {
          console.log(result.text);
          console.log('message sent!');
          setEmailSent(true);
        },
        error => {
          console.log(error.text);
          console.log('error sending message, try again!');
        },
      );
  };

  const EmailSent = <p>Thanks for reaching out. I'll get back to you as soon as I can.</p>;

  const inputClasses =
    'bg-neutral-700 border-0 focus:border-0 focus:outline-none focus:ring-1 focus:ring-purple-600 rounded-md placeholder:text-neutral-400 placeholder:text-sm text-neutral-200 text-sm';

  return emailSent ? (
    EmailSent
  ) : (
    <form className="grid min-h-[320px] grid-cols-1 gap-y-4" method="POST" onSubmit={sendEmail} ref={form}>
      <input className={inputClasses} name="user_name" placeholder="Name" required type="text" />
      <input
        autoComplete="email"
        className={inputClasses}
        name="user_email"
        placeholder="Email"
        required
        type="email"
      />
      <textarea className={inputClasses} maxLength={250} name="user_message" placeholder="Message" required rows={6} />
      <button
        aria-label="Submit contact form"
        className="w-max rounded-full border-2 border-purple-600 bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-md outline-none hover:bg-stone-800 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-stone-800"
        type="submit">
        Send Message
      </button>
    </form>
  );
});

ContactForm.displayName = 'ContactForm';
export default ContactForm;
