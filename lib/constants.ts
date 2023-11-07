export const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
export const PER_PAGE = 10

export const SMTP_MAILER = process.env.SMTP_MAILER ? process.env.SMTP_MAILER : '';
export const SMTP_HOST = process.env.SMTP_HOST ? process.env.SMTP_HOST : '';
export const SMTP_PORT = process.env.SMTP_PORT ? process.env.SMTP_PORT : '';
export const SMTP_USERNAME = process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : '';
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD : '';
export const SMTP_ENCRYPTION = process.env.SMTP_ENCRYPTION ? process.env.SMTP_ENCRYPTION : '';
export const SMTP_FROM_ADDRESS = process.env.SMTP_FROM_ADDRESS ? process.env.SMTP_FROM_ADDRESS : '';
export const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME ? process.env.SMTP_FROM_NAME : '';

export const userStatus = { false: "Deactive", true: "Active" }