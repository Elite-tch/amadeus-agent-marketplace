//handles file upload for agent logo, video, and screenshots
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

const MAX_FILE_SIZES = {
  logo: 2 * 1024 * 1024,        // 2MB
  video: 50 * 1024 * 1024,      // 50MB
  screenshot: 5 * 1024 * 1024,  // 5MB
};

const ALLOWED_TYPES = {
  logo: ['image/png', 'image/jpeg', 'image/svg+xml'],
  video: ['video/mp4', 'video/webm'],
  screenshot: ['image/png', 'image/jpeg', 'image/webp'],
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'logo' | 'video' | 'screenshot';

    // Validation
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!type || !['logo', 'video', 'screenshot'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid type. Must be logo, video, or screenshot' },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZES[type]) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds ${MAX_FILE_SIZES[type] / 1024 / 1024}MB limit`
        },
        { status: 400 }
      );
    }

    // Check file type
    if (!ALLOWED_TYPES[type].includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type. Allowed: ${ALLOWED_TYPES[type].join(', ')}`
        },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(`agents/${type}-${Date.now()}-${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      type,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      },
      { status: 500 }
    );
  }
}
