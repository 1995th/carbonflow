INSERT INTO carbon_credits (
  name,
  description,
  price,
  quantity,
  location,
  project_type,
  vintage,
  verification_standard,
  image_url,
  status
) VALUES
(
  'Amazon Rainforest Conservation',
  'Protect and preserve 10,000 hectares of pristine Amazon rainforest, preventing deforestation and supporting local communities.',
  45.99,
  1000,
  'Brazil',
  'Forest Conservation',
  2023,
  'Verified Carbon Standard (VCS)',
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
  'available'
),
(
  'Wind Farm Development',
  'Large-scale wind energy project generating clean electricity and reducing dependency on fossil fuels.',
  32.50,
  2000,
  'Texas, USA',
  'Renewable Energy',
  2023,
  'Gold Standard',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
  'available'
),
(
  'Mangrove Restoration',
  'Restoration of coastal mangrove ecosystems, enhancing biodiversity and protecting coastlines.',
  28.75,
  1500,
  'Indonesia',
  'Ecosystem Restoration',
  2023,
  'Plan Vivo',
  'https://images.unsplash.com/photo-1626668893632-6f3a4466d22f',
  'available'
);