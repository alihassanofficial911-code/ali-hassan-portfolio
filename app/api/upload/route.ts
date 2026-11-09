import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gzwtsldedcplrowmdlhx.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6d3RzbGRlZGNwbHJvd21kbGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4OTIxNzksImV4cCI6MjEwODQ2ODE3OX0.HrfD4cUehV124-x_i5lc-arSvAqI0SASo2iYBOu2LU0';
const BUCKET_NAME = 'portfolio-media';

export async function POST(req: NextRequest) {
  try {
    const authCookie = req.cookies.get('admin_session')?.value;
    if (authCookie !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || '';
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${Date.now()}_${baseName}${ext}`;
    const mimeType = file.type || 'application/octet-stream';

    // 1. Primary: Upload directly to Supabase Storage (permanent cloud CDN)
    if (SUPABASE_URL && SUPABASE_KEY) {
      try {
        const uploadEndpoint = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${fileName}`;
        const res = await fetch(uploadEndpoint, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': mimeType,
          },
          body: buffer,
        });

        if (res.ok) {
          const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;
          return NextResponse.json({ success: true, url: publicUrl, fileName });
        } else {
          const errText = await res.text();
          console.warn('Supabase storage upload error response:', errText);
        }
      } catch (cloudErr) {
        console.error('Supabase storage exception:', cloudErr);
      }
    }

    // 2. Secondary: Save locally if running in local node environment
    try {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({ success: true, url: `/uploads/${fileName}`, fileName });
    } catch (fsError) {
      // 3. Fallback: Base64 data URI
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64}`;
      return NextResponse.json({ success: true, url: dataUrl, fileName: file.name });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
