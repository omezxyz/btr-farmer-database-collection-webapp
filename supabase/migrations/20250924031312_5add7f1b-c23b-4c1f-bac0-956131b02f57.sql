-- Create a table for farmer surveys
CREATE TABLE public.farmer_surveys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_name TEXT NOT NULL,
  village TEXT NOT NULL,
  education_qualification TEXT NOT NULL,
  educational_status_household TEXT NOT NULL,
  family_members INTEGER NOT NULL,
  household_income TEXT NOT NULL,
  farming_methods TEXT NOT NULL,
  land_area TEXT NOT NULL,
  farm_activities TEXT NOT NULL,
  cultivation_resources TEXT NOT NULL,
  technology_use TEXT NOT NULL,
  scientific_method TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.farmer_surveys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert surveys (public survey collection)
CREATE POLICY "Anyone can insert farmer surveys" 
ON public.farmer_surveys 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to view surveys (for responses page)
CREATE POLICY "Anyone can view farmer surveys" 
ON public.farmer_surveys 
FOR SELECT 
USING (true);

-- Create index for better performance
CREATE INDEX idx_farmer_surveys_submitted_at ON public.farmer_surveys(submitted_at DESC);