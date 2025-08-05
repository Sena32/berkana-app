import { NextRequest, NextResponse } from 'next/server';
import { extractToken } from '@/lib/extractToken';

export async function GET(request: NextRequest) {
  try {
    const token = extractToken(request);
    if (!token) {
      return NextResponse.json(
        { message: 'Token de acesso não encontrado' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page')) || 1;

    // Fazer requisição para o backend
    const adminUrl = process.env.NEXT_PUBLIC_API_URL_ADMIN || 'http://74.163.99.16';
    const url = `${adminUrl}/api/course/recommended?page=${page}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || 'Erro ao buscar cursos recomendados' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Erro ao buscar cursos recomendados:', error);
    return NextResponse.json(
      { message: error.message || 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 