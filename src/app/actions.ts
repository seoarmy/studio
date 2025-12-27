'use server';

import {
  intelligentContactForm,
  type IntelligentContactFormInput,
} from '@/ai/flows/intelligent-contact-form';
import {
  predictiveCampaignAnalysis,
  type PredictiveCampaignAnalysisInput,
} from '@/ai/flows/predictive-campaign-analysis';

export async function analyzeContactQuestion(
  input: IntelligentContactFormInput
) {
  try {
    const output = await intelligentContactForm(input);
    return { success: true, data: output };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to analyze the question.' };
  }
}

export async function getCampaignAnalysis(
  input: PredictiveCampaignAnalysisInput
) {
  try {
    const output = await predictiveCampaignAnalysis(input);
    return { success: true, data: output };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to perform campaign analysis.' };
  }
}
