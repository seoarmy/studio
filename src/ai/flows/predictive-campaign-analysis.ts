'use server';

/**
 * @fileOverview Implements an AI flow for predictive campaign analysis, allowing marketing managers to simulate campaign performance.
 *
 * - predictiveCampaignAnalysis - A function that predicts campaign impact using AI.
 * - PredictiveCampaignAnalysisInput - The input type for the predictiveCampaignAnalysis function.
 * - PredictiveCampaignAnalysisOutput - The return type for the predictiveCampaignAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveCampaignAnalysisInputSchema = z.object({
  campaignDescription: z
    .string()
    .describe('Detailed description of the advertising campaign, including target audience, budget, and channels.'),
  marketConditions: z
    .string()
    .describe('Description of the current market conditions and trends in Argentina.'),
  historicalData: z
    .string()
    .optional()
    .describe('Optional: Historical performance data of similar campaigns.'),
});
export type PredictiveCampaignAnalysisInput = z.infer<
  typeof PredictiveCampaignAnalysisInputSchema
>;

const PredictiveCampaignAnalysisOutputSchema = z.object({
  predictedImpact: z
    .string()
    .describe('AI-predicted impact of the campaign, including estimated reach, engagement, and conversion rates.'),
  riskAssessment: z
    .string()
    .describe('Assessment of potential risks and challenges associated with the campaign.'),
  recommendations: z
    .string()
    .describe('Recommendations for optimizing the campaign strategy based on the analysis.'),
});
export type PredictiveCampaignAnalysisOutput = z.infer<
  typeof PredictiveCampaignAnalysisOutputSchema
>;

export async function predictiveCampaignAnalysis(
  input: PredictiveCampaignAnalysisInput
): Promise<PredictiveCampaignAnalysisOutput> {
  return predictiveCampaignAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictiveCampaignAnalysisPrompt',
  input: {schema: PredictiveCampaignAnalysisInputSchema},
  output: {schema: PredictiveCampaignAnalysisOutputSchema},
  prompt: `You are an expert marketing analyst specializing in the Argentinian market.

You will analyze the provided campaign description, market conditions, and historical data (if available) to predict the campaign's potential impact.

Consider the unique characteristics of the Argentinian market, including cultural nuances, economic factors, and consumer behavior.

Based on your analysis, provide a predicted impact assessment, identify potential risks, and offer recommendations for optimizing the campaign strategy.

Campaign Description: {{{campaignDescription}}}
Market Conditions: {{{marketConditions}}}
Historical Data (Optional): {{{historicalData}}}

Predicted Impact: 
Risk Assessment:
Recommendations:`,
});

const predictiveCampaignAnalysisFlow = ai.defineFlow(
  {
    name: 'predictiveCampaignAnalysisFlow',
    inputSchema: PredictiveCampaignAnalysisInputSchema,
    outputSchema: PredictiveCampaignAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
