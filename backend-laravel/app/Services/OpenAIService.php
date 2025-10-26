<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;

class OpenAIService extends AIService
{
    public function __construct()
    {
        $this->apiKey = Config::get('services.openai.api_key');
        $this->apiUrl = 'https://api.openai.com/v1/';
    }

    /**
     * Analyze an image and get descriptions
     */
    public function analyzeImage($imagePath)
    {
        try {
            // Read the image file
            $imageData = Storage::get($imagePath);
            $base64Image = base64_encode($imageData);

            $data = [
                'model' => 'gpt-4-vision-preview',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => [
                            [
                                'type' => 'text',
                                'text' => 'Analyze this fashion image and describe the style, colors, and clothing items.'
                            ],
                            [
                                'type' => 'image_url',
                                'image_url' => [
                                    'url' => 'data:image/jpeg;base64,' . $base64Image
                                ]
                            ]
                        ]
                    ]
                ],
                'max_tokens' => 300
            ];

            return $this->makeRequest('chat/completions', $data);
        } catch (\Exception $e) {
            Log::error('OpenAI Image Analysis Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Get embeddings for text
     */
    public function getTextEmbeddings($text)
    {
        try {
            $data = [
                'model' => 'text-embedding-ada-002',
                'input' => $text
            ];

            return $this->makeRequest('embeddings', $data, 'POST');
        } catch (\Exception $e) {
            Log::error('OpenAI Embeddings Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Generate outfit recommendations based on description
     */
    public function generateOutfitRecommendations($description)
    {
        try {
            $prompt = "Based on this fashion description: '{$description}', suggest 5 outfit combinations with specific clothing items. Format as a JSON array of objects with 'items' and 'style' properties.";

            $data = [
                'model' => 'gpt-4',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'temperature' => 0.7
            ];

            return $this->makeRequest('chat/completions', $data);
        } catch (\Exception $e) {
            Log::error('OpenAI Outfit Recommendations Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}