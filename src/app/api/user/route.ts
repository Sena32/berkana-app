import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/user.service';
import { extractToken } from '@/lib/extractToken';

export async function POST(request: NextRequest) {
  try {
    const isPublic = request.headers.get('isPublic');
    const token = extractToken(request);
    if (!token && !isPublic) {
      return NextResponse.json(
        { message: 'Token de acesso não encontrado' },
        { status: 401 }
      );
    }
    const body = await request.json();
    let user;
    if (isPublic) {
      user = await UserService.createUser(body);
    } else {
      user = await UserService.createUser(body, { Authorization: `Bearer ${token}` });
    }
    return NextResponse.json(user.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Erro ao criar usuário' },
      { status: error.status || 500 }
    );
  }
} 