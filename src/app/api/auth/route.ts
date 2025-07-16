import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await AuthService.signin(body);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao autenticar' },
      { status: error.status || 500 }
    );
  }
}

export async function GET() {
  // Apenas para checagem simples
  return NextResponse.json({ message: 'Auth API OK' });
} 