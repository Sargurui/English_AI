// AI Service for Gemini and Groq API integration

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function sendMessageToAI(message, userConfig, systemPrompt = '') {
  const { aiProvider, apiKey, nativeLanguage } = userConfig;

  if (!apiKey) {
    throw new Error('API key not configured');
  }

  try {
    if (aiProvider === 'gemini') {
      return await sendToGemini(message, apiKey, systemPrompt, nativeLanguage);
    } else if (aiProvider === 'groq') {
      return await sendToGroq(message, apiKey, systemPrompt, nativeLanguage);
    } else {
      throw new Error('Invalid AI provider');
    }
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}

async function sendToGemini(message, apiKey, systemPrompt, nativeLanguage) {
  const fullPrompt = systemPrompt 
    ? `${systemPrompt}\n\nUser's native language: ${nativeLanguage}\n\nUser: ${message}`
    : message;

  // Use Gemini 2.5 Flash model
  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: fullPrompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      }
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Gemini API error');
  }

  const data = await response.json();
  
  // Better error handling for unexpected response structure
  if (!data.candidates || !data.candidates[0]) {
    throw new Error('Invalid response from Gemini API');
  }
  
  if (!data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
    throw new Error('Unexpected response format from Gemini API');
  }
  
  return data.candidates[0].content.parts[0].text;
}

async function sendToGroq(message, apiKey, systemPrompt, nativeLanguage) {
  const messages = [];
  
  if (systemPrompt) {
    messages.push({
      role: 'system',
      content: `${systemPrompt}\n\nUser's native language: ${nativeLanguage}`
    });
  }
  
  messages.push({
    role: 'user',
    content: message
  });

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-20b',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Groq API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// System prompts for different scenarios
export const SYSTEM_PROMPTS = {
  conversation: (scenario) => `You are an English conversation partner helping someone practice English in a ${scenario} scenario.

CRITICAL INSTRUCTION:
- READ what the user says carefully
- Your next question MUST be based on what the user JUST said
- Build the conversation from the user's actual words
- DO NOT ask random or unrelated questions

YOUR ROLE:
1. Listen carefully to the user's reply
2. Correct any grammar or content mistakes
3. Ask a follow-up question that is DIRECTLY BASED ON what the user just said
4. Keep one continuous conversation thread

RESPONSE STEPS:
Step 1: Read what the user said
Step 2: If there are mistakes, correct them briefly
Step 3: Respond to what they said
Step 4: Ask a follow-up question based on THEIR response (not a random question)

FORMATTING:
- Use **text** for correct grammar/vocabulary
- Use "text" for quoting the user's incorrect phrases

EXAMPLES (CORRECT WAY):

Example 1 - Presentation Topic:
AI: "I'm preparing a presentation. Could you help me with feedback?"
User: "Yes, add more colors"
AI: "Good idea! Just a small correction: we say **add more colors** (you said it correctly). What colors do you think would work well for this client presentation - bright colors or more professional tones?"
[Next: User says "blue and green"]
AI: "Nice choice! **Blue and green** are professional colors. Where should we add these colors - in the charts, the headings, or the background?"

Example 2 - Bus Topic:
AI: "Does this bus go to the city center?"
User: "No, it go to airport"
AI: "I see. Small correction: **it goes to the airport** instead of "it go to airport". Oh, so I need a different bus. Do you know which bus number goes to the city center?"
[Next: User says "number 5"]
AI: "Thank you! **Number 5** goes to the city center. Do you know where I can catch bus number 5 from here?"

Example 3 - Hospital Topic:
AI: "Which floor is the cardiology department on?"
User: "second floor, near elevator"
AI: "Perfect! **The second floor, near the elevator** - that's very helpful. Is it on the left or right side when I get out of the elevator?"
[Next: User says "left side"]
AI: "Great! So it's on the **left side** after I exit the elevator. About how long is the walk from the elevator to the department?"

WRONG EXAMPLES (DON'T DO THIS):

❌ WRONG:
AI: "I'm preparing a presentation. Could you help me?"
User: "Yes, add colors"
AI: "Good morning! How was your commute today?" ← WRONG! This ignores what user said!

✅ CORRECT:
AI: "I'm preparing a presentation. Could you help me?"
User: "Yes, add colors"  
AI: "Great idea! What colors do you suggest?" ← Follows up on what user said!

CRITICAL RULES:
1. ALWAYS base your next question on what the user JUST said
2. Stay in the SAME conversation - don't start new topics
3. Build naturally from their response
4. Make the conversation feel like you're listening to them
5. Each response should reference what they said`,
  
  grammar: `You are an English grammar checker. The user will send you a sentence. Your job is ONLY to return the grammatically correct version of that sentence. 

RULES:
- Return ONLY the corrected sentence, nothing else
- No greetings, no explanations, no extra text
- Just the corrected sentence
- Keep the same meaning and style as the original

Example:
User: "I goes to school everyday"
You: "I go to school every day."

User: "She don't like coffee"
You: "She doesn't like coffee."`,
  
  general: `You are a friendly English teacher helping someone practice English conversation. Be supportive, encouraging, and help them improve their English skills naturally.`
};

// Scenario-specific starting questions (randomized)
const SCENARIO_QUESTION_SETS = {
  'Office': [
    "Good morning! I'm your colleague. I noticed you're working on the quarterly report. How is it going? Are you facing any challenges?",
    "Hi! Did you attend the team meeting yesterday? I missed it and wondered what was discussed.",
    "Hey there! I heard we have a new project starting next week. Have you been assigned to any team yet?",
    "Good afternoon! The deadline for the budget proposal is approaching. How are you managing your tasks?",
    "Hi! I'm preparing a presentation for the client. Could you help me with some feedback when you have time?"
  ],
  'Bus/Transport': [
    "Excuse me, does this bus go to the city center? I'm trying to get to the main train station.",
    "Hello! I'm new to this city. Which bus should I take to reach the shopping mall?",
    "Hi there! Do you know how often this bus comes? I've been waiting for a while.",
    "Excuse me, is this seat taken? Also, do we need to buy tickets before boarding?",
    "Good morning! I need to get to the airport. Is this the right bus, or should I take a taxi?"
  ],
  'Hospital': [
    "Hello, I have an appointment with Dr. Smith today. Could you tell me which floor the cardiology department is on?",
    "Excuse me, I need to get some blood tests done. Where is the laboratory located?",
    "Hi, I'm here to visit a patient. Could you tell me the visiting hours and which ward they might be in?",
    "Good morning! I need to pick up a prescription. Can you direct me to the pharmacy?",
    "Hello! I'm not feeling well and need to see a doctor urgently. Is there an emergency department here?"
  ],
  'School': [
    "Hi! I'm new here. Can you help me find the library? Also, which classes do you have today?",
    "Hey! Did you finish the homework for math class? I'm stuck on question number 5.",
    "Good morning! Are you going to the science fair next week? I heard there will be some amazing projects.",
    "Hi there! I forgot my textbook at home. Can I share yours during the English class?",
    "Hello! Which after-school activities are you planning to join this semester?"
  ],
  'College': [
    "Hey! Are you taking Professor Johnson's class this semester? I heard it's really interesting. What's your major?",
    "Hi! Did you register for the internship program? The deadline is this Friday.",
    "Good morning! I'm looking for study partners for the upcoming midterm exams. Are you interested?",
    "Hey there! Have you decided on your research topic for the final year project?",
    "Hi! Are you attending the guest lecture tomorrow? I heard the speaker is from a top tech company."
  ],
  'Market': [
    "Hello! I'm looking for fresh vegetables. Could you tell me where I can find tomatoes and cucumbers? How much do they cost?",
    "Excuse me! Do you have organic fruits today? I'm especially looking for apples and oranges.",
    "Hi! I need to buy some spices for cooking. Where is the spice section, and do you have fresh coriander?",
    "Good morning! Are these mangoes ripe? How much do they cost per kilogram?",
    "Hello! I'm looking for a good deal on rice and lentils. What's the price today?"
  ]
};

// Get a random question for the scenario
export function getRandomScenarioQuestion(scenarioTitle) {
  const questions = SCENARIO_QUESTION_SETS[scenarioTitle];
  if (questions && questions.length > 0) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
  return `Hello! Let's practice a ${scenarioTitle.toLowerCase()} conversation. I'll start with a question.`;
}

