CREATE TABLE IF NOT EXISTS public.builds (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  app_name text not null,
  tech_stack text,
  status text not null,
  download_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

ALTER TABLE public.builds ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own builds." ON public.builds;
CREATE POLICY "Users can insert their own builds."
  ON public.builds FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own builds." ON public.builds;
CREATE POLICY "Users can view their own builds."
  ON public.builds FOR SELECT
  USING (auth.uid() = user_id);
