-- Create a new storage bucket for avatars
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true);

-- Policy 1: Allow public read access to avatars (so the app can display them)
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

-- Policy 2: Allow authenticated users to upload their own avatar
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check ( 
    bucket_id = 'avatars' 
    and auth.uid() = (storage.foldername(name))[1]::uuid 
  );

-- Policy 3: Allow users to update their own avatar
create policy "Users can update their own avatar"
  on storage.objects for update
  using ( 
    bucket_id = 'avatars' 
    and auth.uid() = (storage.foldername(name))[1]::uuid 
  );

-- Policy 4: Allow users to delete their own avatar
create policy "Users can delete their own avatar"
  on storage.objects for delete
  using ( 
    bucket_id = 'avatars' 
    and auth.uid() = (storage.foldername(name))[1]::uuid 
  );
