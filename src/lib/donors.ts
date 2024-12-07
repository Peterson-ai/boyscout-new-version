import { supabase } from './supabase';
import { Donor } from '@/types/donor';

export async function getDonors() {
  const { data, error } = await supabase
    .from('donors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Donor[];
}

export async function addDonor(donor: Omit<Donor, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('donors')
    .insert([donor])
    .select()
    .single();

  if (error) throw error;
  return data as Donor;
}

export async function updateDonor(id: string, updates: Partial<Donor>) {
  const { data, error } = await supabase
    .from('donors')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Donor;
}

export async function deleteDonor(id: string) {
  const { error } = await supabase
    .from('donors')
    .delete()
    .eq('id', id);

  if (error) throw error;
}