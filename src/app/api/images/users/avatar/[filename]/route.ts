import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const adminUrl = process.env.NEXT_PUBLIC_API_URL_ADMIN || 'http://74.163.99.16';
    
    const imageUrl = `${adminUrl}/upload/users/avatar/${filename}`;
    
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      // Retorna um SVG padrão de usuário quando a imagem não for encontrada
      const defaultUserSvg = `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="22" fill="#E5E7EB"/>
        <path d="M22 22C24.7614 22 27 19.7614 27 17C27 14.2386 24.7614 12 22 12C19.2386 12 17 14.2386 17 17C17 19.7614 19.2386 22 22 22Z" fill="#9CA3AF"/>
        <path d="M22 24C17.5817 24 14 27.5817 14 32H30C30 27.5817 26.4183 24 22 24Z" fill="#9CA3AF"/>
      </svg>`;
      
      return new NextResponse(defaultUserSvg, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }
    
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar imagem:', error);
    return new NextResponse('Erro interno do servidor', { status: 500 });
  }
} 