<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StyleQuiz;
use App\Models\UserStyleProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;

class StyleQuizController extends Controller
{
    /**
     * Get all style quizzes
     */
    public function index(): JsonResponse
    {
        try {
            $quizzes = StyleQuiz::all();
            
            return Response::json([
                'message' => 'Style quizzes retrieved successfully',
                'data' => $quizzes
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Submit quiz responses and get style profile
     */
    public function submit(Request $request, $id): JsonResponse
    {
        $request->validate([
            'responses' => 'required|array'
        ]);

        try {
            $quiz = StyleQuiz::findOrFail($id);
            
            // In a real implementation, we would analyze the responses
            // and determine the user's style profile
            $styleType = 'casual'; // Placeholder
            
            // Save the user's style profile
            $styleProfile = UserStyleProfile::updateOrCreate(
                ['user_id' => Auth::id()],
                [
                    'quiz_responses' => $request->responses,
                    'style_type' => $styleType,
                    'preferences' => [] // Placeholder
                ]
            );
            
            return Response::json([
                'message' => 'Quiz submitted successfully',
                'data' => [
                    'quiz' => $quiz,
                    'style_profile' => $styleProfile
                ]
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get user's style profile
     */
    public function getProfile(): JsonResponse
    {
        try {
            $styleProfile = UserStyleProfile::where('user_id', Auth::id())->first();
            
            return Response::json([
                'message' => 'Style profile retrieved successfully',
                'data' => $styleProfile
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }
}