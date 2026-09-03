import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const f = createUploadthing();

const documentTypes = {
  'application/pdf': { maxFileSize: '8MB', maxFileCount: 1 },
  'application/msword': { maxFileSize: '8MB', maxFileCount: 1 },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
    maxFileSize: '8MB',
    maxFileCount: 1,
  },
} as const;

export const ourFileRouter = {
  resumeUploader: f(documentTypes)
    .middleware(async () => {
      const supabase = await createSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      return { userId: user?.id ?? null };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return { url: file.ufsUrl, name: file.name, size: file.size, userId: metadata.userId };
    }),

  coverLetterUploader: f(documentTypes)
    .middleware(async () => {
      const supabase = await createSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      return { userId: user?.id ?? null };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return { url: file.ufsUrl, name: file.name, size: file.size, userId: metadata.userId };
    }),

  avatarUploader: f({
    image: { maxFileSize: '2MB', maxFileCount: 1 },
  })
    .middleware(async () => {
      const supabase = await createSupabaseServerClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new UploadThingError('You must be signed in to upload an avatar.');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return { url: file.ufsUrl, userId: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
