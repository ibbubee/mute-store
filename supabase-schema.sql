DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS orders;

-- 1. Create the Products table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  "originalPrice" NUMERIC,
  category TEXT NOT NULL,
  "storeType" TEXT NOT NULL,
  brand TEXT,
  style TEXT,
  material TEXT,
  "fitType" TEXT,
  sizes JSONB,
  images JSONB,
  tags JSONB,
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  "newArrival" BOOLEAN DEFAULT false,
  "limitedStock" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the Categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  image TEXT,
  "storeType" TEXT NOT NULL
);

-- 3. Create the Orders table
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  "customerName" TEXT NOT NULL,
  "customerEmail" TEXT NOT NULL,
  "totalAmount" NUMERIC NOT NULL,
  "orderStatus" TEXT NOT NULL,
  items JSONB NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Enable Row Level Security (RLS) and create permissive policies for development
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access (Anyone can view products and categories)
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);

-- 2. Public Create Access for Orders (Anyone can checkout)
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);

-- 3. Admin Only Access (Must be logged into Supabase Auth)
-- This ensures only authenticated admins can manage products/categories or view orders
CREATE POLICY "Allow auth all on products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth all on orders" ON orders FOR ALL USING (auth.role() = 'authenticated');

-- 5. Track WhatsApp Clicks
ALTER TABLE products ADD COLUMN IF NOT EXISTS whatsapp_clicks INTEGER DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_whatsapp_clicks(product_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET whatsapp_clicks = whatsapp_clicks + 1
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
