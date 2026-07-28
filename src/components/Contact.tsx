import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckIcon, LoaderIcon } from 'lucide-react';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  isEmailJsConfigured } from
'../lib/emailjsConfig';

const DETAILS = [
{ icon: MailIcon, label: 'Email', value: 'susaaant@gmail.com', href: 'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSDbSGqZnvkfKJJMgTWDlTCLpHdBCHmGRVKgSpVtFkMJngqMKZzlkxPZtvJqqgnJqGmnXNfl', target:'_blank', },
{ icon: PhoneIcon, label: 'Phone', value: '+977 9826160838', href: 'tel:+9779826160838' },
{ icon: MapPinIcon, label: 'Location', value: 'Kathmandu, Nepal' }];


type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleChange = (field: keyof typeof form) => (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (status !== 'sending') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and message.');
      setStatus('error');
      return;
    }

    if (!isEmailJsConfigured) {
      setError('Email sending is not configured yet. Add your EmailJS keys in lib/emailjsConfig.ts.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'New portfolio message',
          message: form.message
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Something went wrong sending your message. Please try again.');
      setStatus('error');
    }
  };

  const inputClass =
  'w-full rounded-lg border border-line bg-white px-4 py-3 text-base text-heading outline-none transition-colors placeholder:text-body/50 focus:border-accent';

  return (
    <section id="contact" className="w-full bg-white px-6 py-20 md:py-24">
      <div className="mx-auto w-full max-w-[1024px]">
        <div className="mx-auto max-w-[672px] text-center">
          <h2 className="font-display text-4xl font-extrabold text-heading md:text-5xl">
            Get In Touch
          </h2>
          <p className="mt-5 text-lg text-body">
            Whether you have a question, a project in mind, or just want to say hi, I'll try my best
            to get back to you!
          </p>
        </div>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[360px_1fr]">
          <div className="flex flex-col gap-8 rounded-2xl border border-line bg-white p-8 shadow-sm">
            {DETAILS.map(({ icon: Icon, label, value, href, target }) =>
            <div key={label} className="flex items-center gap-4">
                <span className="rounded-xl bg-secondary p-3 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-body">{label}</p>
                  {href ?
                <a href={href} target={target} className="text-base font-semibold text-heading hover:underline">
                      {value}
                    </a> :

                <p className="text-base font-semibold text-heading">{value}</p>
                }
                </div>
              </div>
            )}
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-line bg-white p-8 shadow-sm">
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-heading">
                  Name
                </label>
                <input
                  id="name"
                  name="from_name"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="John Doe"
                  className={inputClass}
                  required />
                
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-heading">
                  Email
                </label>
                <input
                  id="email"
                  name="from_email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="john@example.com"
                  className={inputClass}
                  required />
                
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label htmlFor="subject" className="block text-sm font-medium text-heading">
                Subject (Optional)
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange('subject')}
                placeholder="Project Inquiry"
                className={inputClass} />
              
            </div>

            <div className="mt-6 space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-heading">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                placeholder="Tell me about your project..."
                className={`${inputClass} resize-none`}
                required />
              
            </div>

            {status === 'error' &&
            <p role="alert" className="mt-4 text-sm text-red-600">
                {error}
              </p>
            }
            {status === 'sent' &&
            <p role="status" className="mt-4 flex items-center gap-2 text-sm text-accent">
                <CheckIcon className="h-4 w-4" aria-hidden="true" />
                Thanks! Your message has been sent.
              </p>
            }

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-heading px-4 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60">
              
              {status === 'sending' ?
              <LoaderIcon className="h-[18px] w-[18px] animate-spin" aria-hidden="true" /> :

              <SendIcon className="h-[18px] w-[18px]" aria-hidden="true" />
              }
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>);

}