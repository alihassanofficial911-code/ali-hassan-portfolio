import { NextRequest, NextResponse } from 'next/server';
import { addContactMessage } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'يرجى ملء جميع الحقول الإلزامية / Please fill all required fields' },
        { status: 400 }
      );
    }

    const saved = addContactMessage({
      name,
      email,
      subject: subject || 'No subject',
      message,
    });

    return NextResponse.json({
      success: true,
      message: 'تم إرسال رسالتك بنجاح! سيتواصل معك علي حسن في أقرب وقت.',
      data: saved,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
