ALTER TABLE public.builds ADD COLUMN IF NOT EXISTS progress integer DEFAULT 0;
