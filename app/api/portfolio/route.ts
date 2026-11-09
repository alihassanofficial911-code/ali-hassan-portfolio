import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';
import { PortfolioData } from '@/types/portfolio';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const data = getPortfolioData();
    // Exclude adminPassword from public response
    const { adminPassword, ...publicData } = data;
    return NextResponse.json(publicData);
  } catch (error) {
    console.error('API Portfolio GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Check authentication cookie
    const authCookie = req.cookies.get('admin_session')?.value;
    if (authCookie !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    const body = await req.json();
    const current = getPortfolioData();

    // Preserve the adminPassword unless explicitly updated
    const updatedData: PortfolioData = {
      ...current,
      ...body,
      adminPassword: body.adminPassword || current.adminPassword || 'admin',
    };

    const success = savePortfolioData(updatedData);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save portfolio data' }, { status: 500 });
    }

    const { adminPassword, ...savedPublic } = updatedData;
    return NextResponse.json({ success: true, data: savedPublic });
  } catch (error) {
    console.error('API Portfolio PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
