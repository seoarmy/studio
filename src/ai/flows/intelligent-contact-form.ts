'use server';

/**
 * @fileOverview A Genkit flow for the intelligent contact form. Analyzes user questions and pre-populates relevant fields.
 *
 * - intelligentContactForm - A function that handles the intelligent contact form process.
 * - IntelligentContactFormInput - The input type for the intelligentContactForm function.
 * - IntelligentContactFormOutput - The return type for the intelligentContactForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentContactFormInputSchema = z.object({
  question: z
    .string()
    .describe('The user question or inquiry from the contact form.'),
});
export type IntelligentContactFormInput = z.infer<typeof IntelligentContactFormInputSchema>;

const IntelligentContactFormOutputSchema = z.object({
  name: z.string().optional().describe('The user name.'),
  email: z.string().email().optional().describe('The user email address.'),
  serviceOfInterest:
    z
      .string()
      .optional()
      .describe(
        'The specific marketing service the user is interested in (e.g., SEO, SEM, social media).'
      ),
  urgency: z.string().optional().describe('The urgency of the request (e.g., high, medium, low).'),
  prefilledFields: z.record(z.any()).optional().describe('Record of prefilled fields with values.'),
});
export type IntelligentContactFormOutput = z.infer<typeof IntelligentContactFormOutputSchema>;

export async function intelligentContactForm(input: IntelligentContactFormInput): Promise<IntelligentContactFormOutput> {
  return intelligentContactFormFlow(input);
}

const analyzeQuestionTool = ai.defineTool({
  name: 'analyzeQuestion',
  description: 'Analyzes the user question and extracts relevant information to pre-fill the contact form fields.',
  inputSchema: IntelligentContactFormInputSchema,
  outputSchema: IntelligentContactFormOutputSchema,
},
async (input) => {
  // Placeholder implementation for analyzing the question and extracting info.
  //In a real implementation, this would involve calling an external NLP service
  //or using a local NLP library to parse the question and identify key entities.
  console.log("Analyzing question: " + input.question);
  return {
    name: '',
    email: '',
    serviceOfInterest: '',
    urgency: '',
    prefilledFields: {},
  };
});

const intelligentContactFormPrompt = ai.definePrompt({
  name: 'intelligentContactFormPrompt',
  tools: [analyzeQuestionTool],
  input: {schema: IntelligentContactFormInputSchema},
  output: {schema: IntelligentContactFormOutputSchema},
  prompt: `You are an AI assistant helping to pre-fill a contact form. Analyze the user's question and pre-populate the form fields.

  Question: {{{question}}}

  Use the analyzeQuestion tool to extract relevant information from the question to pre-fill the contact form fields. Return a JSON object with the pre-filled values. If you cannot analyze the question, return an empty object.

  Make sure the email address is valid.
  If the question contains words such as 'urgent' or 'immediately', set the urgency field to "high", otherwise leave it blank.
  `,
});

const intelligentContactFormFlow = ai.defineFlow(
  {
    name: 'intelligentContactFormFlow',
    inputSchema: IntelligentContactFormInputSchema,
    outputSchema: IntelligentContactFormOutputSchema,
  },
  async input => {
    const {output} = await intelligentContactFormPrompt(input);
    return output!;
  }
);
