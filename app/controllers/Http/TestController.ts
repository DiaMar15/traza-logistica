import mail from '@adonisjs/mail/services/main'

export default class TestController {
  async send() {
    await mail.send((message) => {
      message
        .to('dianamarcela1023@gmail.com')
        .from(process.env.MAIL_FROM_ADDRESS!)
        .subject('Prueba SendGrid')
        .html('<h1>Funciona 🔥</h1>')
    })

    return 'Correo enviado'
  }
}
