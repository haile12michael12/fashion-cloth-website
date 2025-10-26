<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AIRecommendation;
use App\Services\OpenAIService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class AIStylistController extends Controller
{
    protected $openAIService;

    public function __construct(OpenAIService $openAIService)
    {
        $this->openAIService = $openAIService;
    }

    /**
     * Get outfit recommendations based on an image
     */
    public function recommendOutfits(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:5120', // 5MB max
            'mood' => 'nullable|string|max:255'
        ]);

        try {
            // Store the uploaded image
            $imagePath = $request->file('image')->store('ai-inputs', 'public');
            
            // Analyze the image with OpenAI
            $analysis = $this->openAIService->analyzeImage($imagePath);
            
            if (isset($analysis['error'])) {
                return Response::json(['error' => $analysis['error']], 500);
            }
            
            // Extract the description from the analysis
            $description = $analysis['choices'][0]['message']['content'] ?? '';
            
            // Generate outfit recommendations
            $recommendations = $this->openAIService->generateOutfitRecommendations($description);
            
            if (isset($recommendations['error'])) {
                return Response::json(['error' => $recommendations['error']], 500);
            }
            
            // Save the recommendation to the database
            $aiRecommendation = AIRecommendation::create([
                'user_id' => Auth::id(),
                'type' => 'outfit',
                'input_data' => [
                    'image_path' => $imagePath,
                    'mood' => $request->mood,
                    'description' => $description
                ],
                'recommendations' => $recommendations
            ]);
            
            return Response::json([
                'message' => 'Outfit recommendations generated successfully',
                'data' => $aiRecommendation
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get color-based recommendations
     */
    public function recommendByColor(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:5120', // 5MB max
        ]);

        try {
            // Store the uploaded image
            $imagePath = $request->file('image')->store('ai-inputs', 'public');
            
            // For now, we'll return a placeholder response
            // In a real implementation, we would integrate with a color extraction service
            $recommendations = [
                'dominant_colors' => ['#FF0000', '#00FF00', '#0000FF'],
                'matching_products' => [
                    ['id' => 1, 'name' => 'Red Dress', 'price' => 49.99],
                    ['id' => 2, 'name' => 'Green Shirt', 'price' => 29.99],
                    ['id' => 3, 'name' => 'Blue Jeans', 'price' => 39.99]
                ]
            ];
            
            // Save the recommendation to the database
            $aiRecommendation = AIRecommendation::create([
                'user_id' => Auth::id(),
                'type' => 'color',
                'input_data' => [
                    'image_path' => $imagePath
                ],
                'recommendations' => $recommendations
            ]);
            
            return Response::json([
                'message' => 'Color recommendations generated successfully',
                'data' => $aiRecommendation
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }
}