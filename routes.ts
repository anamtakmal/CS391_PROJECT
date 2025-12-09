import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { z } from "zod";

const previewRequestSchema = z.object({
  garmentType: z.string().default('hoodie'),
  baseColor: z.string().default('#0a0a0a'),
  fabric: z.string().default('Heavy Cotton'),
  style: z.string().default('Oversized'),
  graphics: z.array(z.object({
    name: z.string(),
    type: z.string().optional(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }).optional(),
    scale: z.number().optional(),
  })).default([]),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post('/api/generate-preview', async (req, res) => {
    try {
      const parseResult = previewRequestSchema.safeParse(req.body || {});
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          error: 'Invalid request',
          message: parseResult.error.errors.map(e => e.message).join(', ')
        });
      }
      
      const { garmentType, baseColor, fabric, style, graphics } = parseResult.data;

      if (!process.env.OPENAI_API_KEY) {
        return res.status(400).json({ 
          error: 'OpenAI API key not configured',
          message: 'Please add your OpenAI API key to use AI preview generation'
        });
      }

      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const colorName = getColorName(baseColor);
      const graphicDescriptions = graphics && graphics.length > 0
        ? graphics.map((g) => g.name).join(', ')
        : 'no graphics';

      const prompt = `A professional fashion product photo of a ${style.toLowerCase()} ${garmentType} in ${colorName} color, made of ${fabric.toLowerCase()} fabric. The garment features ${graphicDescriptions} design elements. Ed Hardy tattoo-inspired darkwave punk aesthetic with detailed graphics. Clean white studio background, professional lighting, high-end streetwear fashion photography. 8k, detailed textures.`;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      if (!response.data || response.data.length === 0) {
        throw new Error('No image generated');
      }
      
      const imageUrl = response.data[0].url;

      res.json({ imageUrl, prompt });
    } catch (error: unknown) {
      console.error('Error generating preview:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ 
        error: 'Failed to generate preview',
        message: errorMessage
      });
    }
  });

  return httpServer;
}

function getColorName(hex: string): string {
  const colorMap: Record<string, string> = {
    '#0a0a0a': 'void black',
    '#dc2626': 'blood red',
    '#f5f5f5': 'bone white',
    '#1f1f1f': 'charcoal grey',
    '#991b1b': 'deep crimson',
    '#3f3f3f': 'ash grey',
  };
  return colorMap[hex] || 'black';
}
