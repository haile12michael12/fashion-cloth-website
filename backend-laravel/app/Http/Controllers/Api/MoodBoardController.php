<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MoodBoard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;

class MoodBoardController extends Controller
{
    /**
     * Create a new mood board
     */
    public function create(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'layout_data' => 'required|json',
            'is_public' => 'boolean'
        ]);

        try {
            // Create the mood board
            $moodBoard = MoodBoard::create([
                'title' => $request->title,
                'description' => $request->description,
                'layout_data' => json_decode($request->layout_data, true),
                'user_id' => Auth::id(),
                'is_public' => $request->is_public ?? false,
                'share_token' => Str::random(32)
            ]);
            
            return Response::json([
                'message' => 'Mood board created successfully',
                'data' => $moodBoard
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update a mood board
     */
    public function update(Request $request, $id): JsonResponse
    {
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'layout_data' => 'sometimes|json',
            'is_public' => 'sometimes|boolean'
        ]);

        try {
            $moodBoard = MoodBoard::findOrFail($id);
            
            // Check if the user owns this mood board
            if ($moodBoard->user_id !== Auth::id()) {
                return Response::json(['error' => 'Unauthorized'], 403);
            }
            
            // Update the mood board
            $moodBoard->update($request->only(['title', 'description', 'layout_data', 'is_public']));
            
            return Response::json([
                'message' => 'Mood board updated successfully',
                'data' => $moodBoard
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get a mood board
     */
    public function show($id): JsonResponse
    {
        try {
            $moodBoard = MoodBoard::with('user')->findOrFail($id);
            
            // Check if the mood board is public or owned by the user
            if (!$moodBoard->is_public && $moodBoard->user_id !== Auth::id()) {
                return Response::json(['error' => 'Unauthorized'], 403);
            }
            
            return Response::json([
                'message' => 'Mood board retrieved successfully',
                'data' => $moodBoard
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Share a mood board
     */
    public function share($token): JsonResponse
    {
        try {
            $moodBoard = MoodBoard::where('share_token', $token)->firstOrFail();
            
            // Check if the mood board is public
            if (!$moodBoard->is_public) {
                return Response::json(['error' => 'Unauthorized'], 403);
            }
            
            return Response::json([
                'message' => 'Mood board retrieved successfully',
                'data' => $moodBoard
            ]);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()], 500);
        }
    }
}