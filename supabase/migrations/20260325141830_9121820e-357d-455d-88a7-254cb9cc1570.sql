
-- Fix the typo in anamnesis_templates column name
ALTER TABLE public.anamnesis_templates RENAME COLUMN descr0iption TO description;

-- Create missing tables: appointment_events and patient_clinical_flags

CREATE TABLE IF NOT EXISTS public.appointment_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  performed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointment_events_appointment ON public.appointment_events(appointment_id);
CREATE INDEX idx_appointment_events_clinic ON public.appointment_events(clinic_id);

ALTER TABLE public.appointment_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view events from their clinic"
  ON public.appointment_events FOR SELECT TO authenticated
  USING (clinic_id IN (
    SELECT ur.clinic_id FROM public.user_roles ur WHERE ur.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert events for their clinic"
  ON public.appointment_events FOR INSERT TO authenticated
  WITH CHECK (clinic_id IN (
    SELECT ur.clinic_id FROM public.user_roles ur WHERE ur.user_id = auth.uid()
  ));

CREATE TABLE IF NOT EXISTS public.patient_clinical_flags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  clinic_id UUID NOT NULL REFERENCES public.clinics(id) ON DELETE CASCADE,
  flag_type TEXT NOT NULL,
  flag_value TEXT,
  severity TEXT DEFAULT 'info',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_patient_clinical_flags_patient ON public.patient_clinical_flags(patient_id);
CREATE INDEX idx_patient_clinical_flags_clinic ON public.patient_clinical_flags(clinic_id);

ALTER TABLE public.patient_clinical_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view flags from their clinic"
  ON public.patient_clinical_flags FOR SELECT TO authenticated
  USING (clinic_id IN (
    SELECT ur.clinic_id FROM public.user_roles ur WHERE ur.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage flags for their clinic"
  ON public.patient_clinical_flags FOR ALL TO authenticated
  USING (clinic_id IN (
    SELECT ur.clinic_id FROM public.user_roles ur WHERE ur.user_id = auth.uid()
  ));
