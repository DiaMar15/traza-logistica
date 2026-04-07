import { defineConfig } from '@adonisjs/mail'
import { transports } from '@adonisjs/mail'

export default defineConfig({
  default: 'smtp',

  mailers: {
    smtp: transports.smtp({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT),
      auth: {
        type: 'login',
        user: process.env.SMTP_USERNAME!,
        pass: process.env.SMTP_PASSWORD!,
      },
    }),
  },
})
