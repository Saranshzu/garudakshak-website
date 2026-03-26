import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'applications.json');

// Ensure data directory and file exist
function ensureDataFile() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, domain, experience, message, portfolio } = body;

    // Basic validation
    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required.' }, { status: 400 });
    }

    ensureDataFile();

    const existing = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    const application = {
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      role: role.trim(),
      domain: domain?.trim() || '',
      experience: experience?.trim() || '',
      message: message?.trim() || '',
      portfolio: portfolio?.trim() || '',
      status: 'new',
    };

    existing.push(application);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));

    return NextResponse.json({ success: true, id: application.id }, { status: 200 });
  } catch (err) {
    console.error('Apply API error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return NextResponse.json({ applications: data, total: data.length }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Could not read applications.' }, { status: 500 });
  }
}