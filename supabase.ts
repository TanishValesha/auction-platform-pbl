import { createClient } from "@supabase/supabase-js";

const supabaseUrl = `https://stwrycmweudibfrjeujg.supabase.co`;
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0d3J5Y213ZXVkaWJmcmpldWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNDQ2NjQsImV4cCI6MjA1NjgyMDY2NH0.0EEAxQ_u51Mh1hQsyQflK9iFq5uZBoq79i39PcYqqo8`;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or Key");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
