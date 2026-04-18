update storage.buckets
set file_size_limit = case
    when id = 'portfolio-videos' then 524288000
    when id = 'portfolio-audio' then 157286400
    when id = 'portfolio-images' then 52428800
    else file_size_limit
  end,
  allowed_mime_types = null
where id in ('portfolio-images', 'portfolio-audio', 'portfolio-videos');
