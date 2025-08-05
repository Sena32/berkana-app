import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    const adminUrl = process.env.NEXT_PUBLIC_API_URL_ADMIN || 'http://74.163.99.16';
    
    const imageUrl = `${adminUrl}/upload/courses/thumbnail/${filename}`;
    
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return new NextResponse('Imagem não encontrada', { status: 404 });
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