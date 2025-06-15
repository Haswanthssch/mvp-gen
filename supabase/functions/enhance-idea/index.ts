
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// System prompt for the AI
const SYSTEM_PROMPT = `You are a product strategist AI helping users convert startup ideas into MVPs. Given a basic project idea, generate a refined and detailed product description suitable for building:

- A landing page (value prop + features)
- Navigation structure
- Authentication logic (sign-in, sign-up, dashboard)
- Minimal database schema

Respond only with the enhanced product description and keep it concise.`;

async function enhanceAndSave(projectId: string, idea: string) {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );

  try {
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55-second timeout

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Idea: "${idea}"` }]
        }]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error: ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
      throw new Error('Invalid response structure from AI.');
    }
    
    const enhanced_prompt = data.candidates[0].content.parts[0].text;
    
    const { error: updateError } = await supabase
      .from('projects')
      .update({ enhanced_prompt, status: 'completed' })
      .eq('id', projectId);

    if (updateError) throw updateError;
    
    console.log(`Successfully enhanced and saved project ${projectId}`);

  } catch (error) {
    console.error(`Error processing project ${projectId}:`, error);
    await supabase
      .from('projects')
      .update({ status: 'failed' })
      .eq('id', projectId);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { projectId, idea } = await req.json();

    // Invoke the enhancement process in the background
    enhanceAndSave(projectId, idea);

    return new Response(JSON.stringify({ message: 'Enhancement process started.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 202,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
