import { NextResponse } from 'next/server';
import { hasDatabaseConfig, saveJobApplication } from '../../../lib/db';

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, domain, experience, message, portfolio } = body;

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required.' }, { status: 400 });
    }

    if (!hasDatabaseConfig()) {
      return NextResponse.json(
        { error: 'Database not configured. Add a Postgres integration in Vercel and set POSTGRES_URL or DATABASE_URL.' },
        { status: 500 }
      );
    }

    await saveJobApplication({
      name,
      email,
      phone,
      role,
      domain,
      experience,
      message,
      portfolio,
    });

    let emailSent = false;

    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `[Job Application] ${role} - ${name}`,
            from_name: name,
            email,
            message: `Role: ${role}\nDomain: ${domain || '-'}\nPhone: ${phone || '-'}\nExperience: ${experience || '-'}\nPortfolio: ${portfolio || '-'}\n\n${message || '-'}`,
            botcheck: '',
          }),
        });

        if (res.ok) {
          const data = await res.json();
          emailSent = Boolean(data.success);
        }
      } catch (emailError) {
        console.error('Application email forwarding failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, stored: true, emailSent }, { status: 200 });
  } catch (err) {
    console.error('Apply error:', err);
    return NextResponse.json({ error: 'Server error. Please try again or email us at contact@garudakshak.com' }, { status: 500 });
  }
}
