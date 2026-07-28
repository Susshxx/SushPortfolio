/**
 * EmailJS configuration.
 *
 * Create a free account at https://www.emailjs.com, then replace the three
 * values below with the IDs from your dashboard:
 *  - SERVICE_ID:  Email Services → your service
 *  - TEMPLATE_ID: Email Templates → your template
 *  - PUBLIC_KEY:  Account → General → Public Key
 *
 * The template should expose these variables:
 *  {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 */
export const EMAILJS_SERVICE_ID = 'service_1oapdfn';
export const EMAILJS_TEMPLATE_ID = 'template_portfolio';
export const EMAILJS_PUBLIC_KEY = 'Lqm9d2D8wvME4X-EO';

export const isEmailJsConfigured =
!EMAILJS_SERVICE_ID.startsWith('YOUR_') &&
!EMAILJS_TEMPLATE_ID.startsWith('YOUR_') &&
!EMAILJS_PUBLIC_KEY.startsWith('YOUR_');