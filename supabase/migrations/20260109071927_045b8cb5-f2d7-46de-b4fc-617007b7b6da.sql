-- Create pranks table
CREATE TABLE public.pranks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_name TEXT NOT NULL,
  crush_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prank_responses table
CREATE TABLE public.prank_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prank_id UUID NOT NULL REFERENCES public.pranks(id) ON DELETE CASCADE,
  friend_name TEXT NOT NULL,
  crush_name TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]',
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pranks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prank_responses ENABLE ROW LEVEL SECURITY;

-- Public read/write for pranks (no auth required for this fun app)
CREATE POLICY "Anyone can create pranks" ON public.pranks FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view pranks" ON public.pranks FOR SELECT USING (true);

-- Public read/write for responses
CREATE POLICY "Anyone can submit responses" ON public.prank_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view responses" ON public.prank_responses FOR SELECT USING (true);

-- Add indexes for performance
CREATE INDEX idx_prank_responses_prank_id ON public.prank_responses(prank_id);