import dotenv from 'dotenv';
dotenv.config({ path: 'C:/Users/MATHEUSHENRIQUECOSTA/Documents/DataViewINSS/.env' });
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.API_KEY)

export async function enviarEmail(destinatario, assunto, mensagem) {
    const message = {
        to: destinatario,
        from: `${process.env.EMAIL_SENDGRID}`,
        subject: assunto,
        html: mensagem
    }

    sgMail.send(message).then(() =>{
        console.log('deu bom')
    }).catch((error) => {
        console.log(error)
    })
    
}


