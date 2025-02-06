import { supabase } from './supabaseClient';

export async function saveMealRecord({ user_id, date, breakfast, lunch, dinner }) {
  try {
    const { data: existingRecords, error: fetchError } = await supabase
      .from('meal_records')
      .select('*')
      .eq('user_id', user_id)
      .eq('date', date);

    if (fetchError) throw fetchError;

    if (existingRecords && existingRecords.length > 0) {
      const recordId = existingRecords[0].id;
      const { error } = await supabase
        .from('meal_records')
        .update({ breakfast, lunch, dinner, updated_at: new Date() })
        .eq('id', recordId);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('meal_records')
        .insert([{ user_id, date, breakfast, lunch, dinner }]);
      if (error) throw error;
    }
  } catch (err) {
    console.error('Error saving meal record:', err);
    throw err;
  }
} 