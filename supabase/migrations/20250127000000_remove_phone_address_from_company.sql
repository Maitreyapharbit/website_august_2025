-- Remove phone and address columns from company table
ALTER TABLE company DROP COLUMN IF EXISTS phone;
ALTER TABLE company DROP COLUMN IF EXISTS address;