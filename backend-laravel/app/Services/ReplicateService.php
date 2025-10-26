<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;

class ReplicateService extends AIService
{
    public function __construct()
    {
        $this->apiKey = Config::get('services.replicate.api_key');
        $this->apiUrl = 'https://api.replicate.com/v1/';
    }

    /**
     * Run a model on Replicate
     */
    public function runModel($model, $input)
    {
        try {
            $data = [
                'version' => $model,
                'input' => $input
            ];

            $response = Http::withHeaders([
                'Authorization' => 'Token ' . $this->apiKey,
                'Content-Type' => 'application/json'
            ])->post($this->apiUrl . 'predictions', $data);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Replicate Model Run Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Get prediction result
     */
    public function getPrediction($predictionId)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Token ' . $this->apiKey,
                'Content-Type' => 'application/json'
            ])->get($this->apiUrl . 'predictions/' . $predictionId);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('Replicate Prediction Get Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Virtual try-on using ID-Makeup model
     */
    public function virtualTryOn($faceImage, $makeupImage)
    {
        $model = 'id-makeup';
        $input = [
            'face_image' => $faceImage,
            'makeup_image' => $makeupImage
        ];

        return $this->runModel($model, $input);
    }
}