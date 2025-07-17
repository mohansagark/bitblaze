import React, { useState } from 'react';
import Container from '../../../components/common/Container';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const WhatsAppChat = () => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const cleanedNumber = number.replace(/\D/g, '');
  const isValidNumber = cleanedNumber.length === 10 || cleanedNumber.length === 12;

  const handleSend = () => {
    if (!isValidNumber) {
      setError('Enter a valid mobile number.');
      return;
    }

    const phoneWithCountryCode = cleanedNumber.length === 10 ? `91${cleanedNumber}` : cleanedNumber;

    const url = `https://wa.me/${phoneWithCountryCode}`;
    window.open(url, '_blank');
    setError('');
  };

  return (
    <>
      <Helmet>
        <title>Send WhatsApp Message Without Saving Number | BitBlaze</title>
        <meta
          name='description'
          content='Send WhatsApp messages instantly without saving the contact. Free online tool to open WhatsApp chat directly.'
        />
        <meta
          name='keywords'
          content='WhatsApp message tool, send message without saving, chat without saving number, WhatsApp link generator'
        />
        <link rel='canonical' href='https://bitblaze.vercel.app/whatsapp-chat' />

        {/* Open Graph */}
        <meta property='og:title' content='Send WhatsApp Message Without Saving Number' />
        <meta
          property='og:description'
          content='Free tool to send WhatsApp messages without saving the number. Instant and simple!'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://bitblaze.vercel.app/whatsapp-chat' />
        <meta property='og:image' content='https://bitblaze.vercel.app/thumbnail.jpg' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Send WhatsApp Without Saving Number' />
        <meta
          name='twitter:description'
          content='Open WhatsApp chat without saving number to contacts. Try now!'
        />
        <meta name='twitter:image' content='https://bitblaze.vercel.app/thumbnail.jpg' />
      </Helmet>

      <Container center>
        <div className='w-full max-w-sm p-6 rounded-xl shadow-md flex flex-col gap-6 bg-[var(--color-surface)] text-[var(--color-surface-text)]'>
          <Typography
            variant='h5'
            className='text-center font-semibold'
            style={{ color: 'var(--color-primary)' }}
          >
            Send WhatsApp Message
          </Typography>

          <Typography variant='body2' className='text-neutral-400 text-center'>
            Use this free tool to instantly open WhatsApp chats with unsaved numbers. No app install
            needed. Just enter a mobile number and click Send.
          </Typography>

          <Input
            label='Mobile Number'
            type='tel'
            value={number}
            onChange={e => setNumber(e.target.value)}
            placeholder='e.g. 9876543210 or 919876543210'
            error={!!error}
            helperText={error}
          />

          <Button
            text='Send on WhatsApp'
            onClick={handleSend}
            id='whatsapp-send'
            sound
            disabled={!isValidNumber}
            className='rounded-lg'
            bgColor='var(--color-secondary)'
            bgHoverColor='var(--color-success)'
            textColor='var(--color-secondary-text)'
          />
        </div>
      </Container>
    </>
  );
};

export default WhatsAppChat;
