CREATE POLICY "Users can update their own builds." ON public.builds FOR UPDATE USING (auth.uid() = user_id);
