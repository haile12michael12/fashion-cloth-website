<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class HuggingFaceService extends AIService
{
    public function __construct()
    {
        $this->apiKey = Config::get('services.huggingface.api_key');
        $this->apiUrl = 'https://api-inference.huggingface.co/';
    }

    /**
     * Get image classification
     */
    public function imageClassification($imagePath)
    {
        try {
            $imageData = file_get_contents($imagePath);
            
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/octet-stream'
            ])->post($this->apiUrl . 'models/google/vit-base-patch16-224', $imageData);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('HuggingFace Image Classification Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Extract color palette from image
     */
    public function extractColorPalette($imagePath)
    {
        try {
            $imageData = file_get_contents($imagePath);
            
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/octet-stream'
            ])->post($this->apiUrl . 'models/akhaliq/colorization', $imageData);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('HuggingFace Color Palette Extraction Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Get fashion trend predictions
     */
    public function getTrendPredictions($text)
    {
        try {
            $data = [
                'inputs' => $text
            ];

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json'
            ])->post($this->apiUrl . 'models/facebook/bart-large-cnn', $data);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('HuggingFace Trend Predictions Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}