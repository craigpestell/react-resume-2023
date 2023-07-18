import dotenv from 'dotenv';
import {google} from 'googleapis';
import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';

import type {Email} from '../../../interfaces';

dotenv.config();
export const runtime = process.env.RUNTIME;

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<Email | {status: number} | {error: string}>,
) {
  const {method} = req;

  switch (method) {
    case 'POST':
      // Update or create data in your database
      //res.status(200).json({name: name || `Name ${name}`});
      if (req.method !== 'POST') {
        return;
      }
      console.log('CLIENT_ID', process.env.CLIENT_ID);
      console.log('CLIENT_SECRET', process.env.CLIENT_SECRET);
      {
        const {name, email, message} = req.body;
        const OAuth2 = google.auth.OAuth2;

        const createTransporter = async () => {
          const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'https://developers.google.com/oauthplayground',
          );

          oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
          });
          console.log({
            refresh_token: process.env.REFRESH_TOKEN,
          });

          /*const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
              if (err) {
                reject(`Failed to create access token :(\n${err}`);
              }
              resolve(token);
            });
          }).catch(err => console.log('Access Token Error: ', err));
          */
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: process.env.EMAIL,
              accessToken: "ya29.a0AbVbY6MAZHK1QOJlURjT7Nagsquqc8pKR0nzrjpUuwz1xqiHkzKQtToUfrEU8bSiC4gJmiY60jfHbr3NBPasCunHNPjZDfzkSF6ql__f0-cQRGUdYATdN2TFmYl3Om3Ed_3xmTnbluafkl3ka9xCHJafmfTwxTUaCgYKAUUSARMSFQFWKvPlE49fOH8YNjXO45jBrEbeog0166",
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });

          try {
            return transporter;
          } catch (error) {
            console.log('Create Transport Error: ', error);
          }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sendEmail = async (emailOptions: any) => {
          try {
            const emailTransporter = await createTransporter();
            const response = await emailTransporter
              .sendMail(emailOptions)
              .catch((err: {msg: string}) => console.log('Email Transport Err: ', err));

            return response;
          } catch (error) {
            console.log('Email Transport Error: ', error);
          }
        };

        try {
          const response = await sendEmail({
            from: email,
            to: 'craigpestell@gmail.com',
            subject: `Contact form submission from ${name}`,
            html: `<p>You have a contact form submission</p><br>
              <p><strong>Email: </strong> ${email}</p><br>
              <p><strong>Message: </strong> ${message}</p><br>
            `,
          })
            .then(() => res.status(200).json({status: 200}))
            .catch(err => console.log('Send Email Err', err));
          return response;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log('Send Email Error: ', error);
          return res.status(500).json({error: error.message || error.toString()});
        }
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
