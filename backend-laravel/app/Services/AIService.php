<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIService
{
    protected $apiKey;
    protected $apiUrl;

    public function __construct()
    {
        // Base constructor for AI services
    }

    /**
     * Make an API request to the AI service
     */
    protected function makeRequest($endpoint, $data, $method = 'POST')
    {
        try {
            $response = Http::withHeaders($this->getHeaders())
                ->{$method}($this->apiUrl . $endpoint, $data);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('AI Service Request Failed: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    /**
     * Get headers for API requests
     */
    protected function getHeaders()
    {
        return [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $this->apiKey
        ];
    }
}