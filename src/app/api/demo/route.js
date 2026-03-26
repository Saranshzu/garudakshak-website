import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'demo-requests.json');

function ensureDataFile() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, org, email, phone, designation, useCase, location, timeline, message, orgType } = body;

    if (!name || !email || !org) {
      return NextResponse.json({ error: 'Name, organisation, and email are required.' }, { status: 400 });
    }

    ensureDataFile();
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    const entry = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      designation: designation?.trim() || '',
      org: org.trim(),
      orgType: orgType?.trim() || '',
      useCase: useCase?.trim() || '',
      location: location?.trim() || '',
      timeline: timeline?.trim() || '',
      message: message?.trim() || '',
      status: 'new',
    };

    existing.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));

    return NextResponse.json({ success: true, id: entry.id }, { status: 200 });
  } catch (err) {
    console.error('Demo API error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return NextResponse.json({ requests: data, total: data.length }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Could not read demo requests.' }, { status: 500 });
  }
}