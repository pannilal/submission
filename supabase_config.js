// supabase_config.js
// Supabase project URL and anonymous key
const SUPA_URL = 'https://auirudgmwlkdscgodwte.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1aXJ1ZGdtd2xrZHNjZ29kd3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTI4OTgsImV4cCI6MjA2MTIyODg5OH0.ItuC1WisauB7SpDI0U4Qxl0Qz77IeSMpqh4NWrIej-A';

// Initialize Supabase client
const supabase = supabase.createClient(SUPA_URL, SUPA_KEY);
