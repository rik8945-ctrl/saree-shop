const SUPABASE_URL = "https://amccedlicdnyulaesqdw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtY2NlZGxpY2RueXVsYWVzcWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NzI1NjAsImV4cCI6MjEwNzA0ODU2MH0.xtle9ghaER6U22ttQImeJVgHHFivmJDJswbdI6SK66k";
const BUCKET = "saree-images";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function safeUrl(u) {
  try {
    const x = new URL(u);
    return x.protocol === "https:" || x.protocol === "http:" ? x.href : "#";
  } catch { return "#"; }
}
