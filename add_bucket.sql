INSERT INTO storage.buckets (id, name, public) VALUES ('apks', 'apks', true) ON CONFLICT (id) DO NOTHING;
