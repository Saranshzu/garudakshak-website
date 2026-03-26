import { NextResponse } from 'next/server';
import { hasDatabaseConfig, saveDemoRequest } from '../../../lib/db';

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, org, email, phone, designation, useCase, location, timeline, message, orgType } = body;

    if (!name || !email || !org) {
      return NextResponse.json({ error: 'Name, organisation, and email are required.' }, { status: 400 });
    }

    if (!hasDatabaseConfig()) {
      return NextResponse.json(
        { error: 'Database not configured. Add a Postgres integration in Vercel and set POSTGRES_URL or DATABASE_URL.' },
        { status: 500 }
      );
    }

    await saveDemoRequest({
      name,
      org,
      email,
      phone,
      designation,
      useCase,
      location,
      timeline,
      message,
      orgType,
    });

    let emailSent = false;

    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `[Demo Request] ${org} - ${name}`,
            from_name: name,
            email,
            message: `Organisation: ${org}\nOrg Type: ${orgType || '-'}\nDesignation: ${designation || '-'}\nPhone: ${phone || '-'}\nLocation: ${location || '-'}\nUse Case: ${useCase || '-'}\nTimeline: ${timeline || '-'}\n\n${message || '-'}`,
            botcheck: '',
          }),
        });

        if (res.ok) {
          const data = await res.json();
          emailSent = Boolean(data.success);
        }
      } catch (emailError) {
        console.error('Demo email forwarding failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, stored: true, emailSent }, { status: 200 });
  } catch (err) {
    console.error('Demo error:', err);
    return NextResponse.json({ error: 'Server error. Please try again or email us at contact@garudakshak.com' }, { status: 500 });
  }
}
