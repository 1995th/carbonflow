/*
  # Update Carbon Credits Data

  1. Changes
    - Update credit descriptions to be more concise
    - Add high-quality images from Unsplash
    - Ensure consistent data formatting
*/

UPDATE carbon_credits
SET 
  description = 'Protect 10,000 hectares of pristine Amazon rainforest through sustainable conservation and community support.',
  image_url = 'https://images.unsplash.com/photo-1586588869741-bed81cad52fd?auto=format&fit=crop&q=80'
WHERE name = 'Amazon Rainforest Conservation';

UPDATE carbon_credits
SET 
  description = 'Large-scale wind farm generating clean electricity, reducing fossil fuel dependency in Texas.',
  image_url = 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80'
WHERE name = 'Wind Farm Development';

UPDATE carbon_credits
SET 
  description = 'Restore vital mangrove ecosystems to enhance biodiversity and protect coastal communities.',
  image_url = 'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80'
WHERE name = 'Mangrove Restoration';